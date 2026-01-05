import type { AdminSession, Sponsor } from '@/api/localStore';
import {
  addSponsor,
  getAdminSession,
  getSponsors,
  loginAdmin,
  logoutAdmin,
  resetAdminPassword,
  toggleSponsorStatus,
  updateSponsorName,
} from '@/api/localStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }
  return date.toLocaleString('pt-BR');
};

export default function Admin() {
  const [user, setUser] = useState<AdminSession | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'reset'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetConfirm, setResetConfirm] = useState('');
  const [resetKey, setResetKey] = useState('');
  const [resetting, setResetting] = useState(false);
  const [newSponsorName, setNewSponsorName] = useState('');
  const [newSponsorFile, setNewSponsorFile] = useState<File | null>(null);
  const [newSponsorImageUrl, setNewSponsorImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [updatingSponsorId, setUpdatingSponsorId] = useState<string | null>(
    null
  );
  const [editingSponsorId, setEditingSponsorId] = useState<string | null>(null);
  const [editingSponsorName, setEditingSponsorName] = useState('');
  const [savingNameId, setSavingNameId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    setUser(getAdminSession());
    setCheckingAuth(false);
  }, []);

  const { data: sponsors = [], isLoading: loadingSponsors } = useQuery({
    queryKey: ['sponsors'],
    queryFn: getSponsors,
    enabled: !!user,
  });

  const activeCount = useMemo(
    () => sponsors.filter((sponsor) => sponsor.status).length,
    [sponsors]
  );

  const addSponsorMutation = useMutation({
    mutationFn: async () => {
      if (!newSponsorFile && !newSponsorImageUrl.trim()) {
        throw new Error('Imagem obrigatoria');
      }
      setUploading(true);
      return addSponsor({
        name: newSponsorName,
        file: newSponsorFile,
        imageUrl: newSponsorImageUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sponsors'] });
      setNewSponsorName('');
      setNewSponsorFile(null);
      setNewSponsorImageUrl('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast.success('Patrocinador adicionado');
    },
    onError: () => {
      toast.error('Erro ao adicionar patrocinador');
    },
    onSettled: () => {
      setUploading(false);
    },
  });

  const toggleSponsorMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      toggleSponsorStatus(id, status),
    onMutate: ({ id }) => {
      setUpdatingSponsorId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sponsors'] });
    },
    onError: () => {
      toast.error('Erro ao atualizar status');
    },
    onSettled: () => {
      setUpdatingSponsorId(null);
    },
  });

  const updateSponsorNameMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateSponsorName(id, name),
    onMutate: ({ id }) => {
      setSavingNameId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sponsors'] });
      toast.success('Nome atualizado');
      setEditingSponsorId(null);
      setEditingSponsorName('');
    },
    onError: () => {
      toast.error('Erro ao atualizar nome');
    },
    onSettled: () => {
      setSavingNameId(null);
    },
  });

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthenticating(true);
    try {
      const session = await loginAdmin(loginEmail, loginPassword);
      if (!session) {
        toast.error('Credenciais invalidas');
        return;
      }
      setUser(session);
      toast.success('Login realizado');
    } catch (error) {
      toast.error('Erro ao fazer login');
    } finally {
      setAuthenticating(false);
    }
  };

  const handleReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resetEmail || !resetPassword || !resetKey) {
      toast.error('Preencha todos os campos');
      return;
    }
    if (resetPassword !== resetConfirm) {
      toast.error('As senhas nao conferem');
      return;
    }
    setResetting(true);
    try {
      const updated = await resetAdminPassword({
        email: resetEmail,
        newPassword: resetPassword,
        resetKey,
      });
      if (!updated) {
        toast.error('Email ou chave invalidos');
        return;
      }
      toast.success('Senha atualizada');
      setLoginEmail(resetEmail);
      setLoginPassword('');
      setResetEmail('');
      setResetPassword('');
      setResetConfirm('');
      setResetKey('');
      setAuthMode('login');
    } catch (error) {
      toast.error('Erro ao redefinir senha');
    } finally {
      setResetting(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-lime-400">
              {authMode === 'login' ? 'Admin Login' : 'Redefinir Senha'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(event) => setLoginEmail(event.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Senha"
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={authenticating}
                  className="w-full bg-lime-500 hover:bg-lime-400 text-black font-bold"
                >
                  {authenticating ? 'Entrando...' : 'Entrar'}
                </Button>
                {/* <button
                  type="button"
                  onClick={() => setAuthMode('reset')}
                  className="w-full text-sm text-gray-400 hover:text-lime-400 transition-colors"
                >
                  Esqueci minha senha
                </button> */}
              </form>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={resetEmail}
                    onChange={(event) => setResetEmail(event.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Nova senha"
                    value={resetPassword}
                    onChange={(event) => setResetPassword(event.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Confirmar senha"
                    value={resetConfirm}
                    onChange={(event) => setResetConfirm(event.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Palavra-chave do reset"
                    value={resetKey}
                    onChange={(event) => setResetKey(event.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={resetting}
                  className="w-full bg-lime-500 hover:bg-lime-400 text-black font-bold"
                >
                  {resetting ? 'Salvando...' : 'Redefinir'}
                </Button>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="w-full text-sm text-gray-400 hover:text-lime-400 transition-colors"
                >
                  Voltar ao login
                </button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black">
            <span className="text-lime-400">PAINEL</span> ADMIN
          </h1>
          <Button
            onClick={() => {
              logoutAdmin();
              setUser(null);
            }}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Sair
          </Button>
        </div>

        <Card className="mb-8 bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lime-400">
              <Plus className="w-5 h-5" />
              Adicionar Patrocinador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input
                placeholder="Nome do Patrocinador"
                value={newSponsorName}
                onChange={(event) => setNewSponsorName(event.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                placeholder="URL da imagem"
                value={newSponsorImageUrl}
                onChange={(event) => {
                  const value = event.target.value;
                  setNewSponsorImageUrl(value);
                  if (value.trim()) {
                    setNewSponsorFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }
                }}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setNewSponsorFile(file);
                  if (file) {
                    setNewSponsorImageUrl('');
                  }
                }}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button
                onClick={() => {
                  const hasImage =
                    !!newSponsorFile || !!newSponsorImageUrl.trim();
                  if (newSponsorName && hasImage) {
                    addSponsorMutation.mutate();
                  }
                }}
                disabled={
                  !newSponsorName ||
                  (!newSponsorFile && !newSponsorImageUrl.trim()) ||
                  uploading
                }
                className="bg-lime-500 hover:bg-lime-400 text-black font-bold"
              >
                {uploading ? 'Enviando...' : 'Adicionar'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lime-400">
              Patrocinadores ({sponsors.length}) - Ativos ({activeCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSponsors ? (
              <p className="text-gray-400">Carregando...</p>
            ) : sponsors.length === 0 ? (
              <p className="text-gray-400">Nenhum patrocinador cadastrado</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sponsors.map((sponsor: Sponsor) => {
                  const isUpdating =
                    toggleSponsorMutation.isPending &&
                    updatingSponsorId === sponsor.id;
                  const isEditing = editingSponsorId === sponsor.id;
                  const isSavingName =
                    updateSponsorNameMutation.isPending &&
                    savingNameId === sponsor.id;
                  return (
                    <div
                      key={sponsor.id}
                      className="bg-gray-800 rounded-lg p-4 flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={sponsor.image}
                          alt={sponsor.name}
                          className="w-16 h-16 object-contain bg-white rounded"
                        />
                        <div className="flex-1">
                          {isEditing ? (
                            <div className="space-y-2">
                              <Input
                                value={editingSponsorName}
                                onChange={(event) =>
                                  setEditingSponsorName(event.target.value)
                                }
                                className="bg-gray-900 border-gray-700 text-white"
                              />
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  disabled={isSavingName}
                                  onClick={() => {
                                    setEditingSponsorId(null);
                                    setEditingSponsorName('');
                                  }}
                                  className="h-9 px-3 text-xs"
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  disabled={
                                    isSavingName || !editingSponsorName.trim()
                                  }
                                  onClick={() =>
                                    updateSponsorNameMutation.mutate({
                                      id: sponsor.id,
                                      name: editingSponsorName,
                                    })
                                  }
                                  className="h-9 px-3 text-xs bg-lime-500 hover:bg-lime-400 text-black"
                                >
                                  {isSavingName ? 'Salvando...' : 'Salvar'}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-semibold">{sponsor.name}</p>
                              <Button
                                variant="ghost"
                                className="h-8 px-2 text-xs"
                                onClick={() => {
                                  setEditingSponsorId(sponsor.id);
                                  setEditingSponsorName(sponsor.name);
                                }}
                              >
                                Editar
                              </Button>
                            </div>
                          )}
                          <p className="text-xs text-gray-400">
                            Criado: {formatDate(sponsor.createdAt)}
                          </p>
                          <p className="text-xs text-gray-400">
                            Atualizado: {formatDate(sponsor.updatedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">
                          Status:{' '}
                          <span
                            className={
                              sponsor.status ? 'text-lime-400' : 'text-gray-400'
                            }
                          >
                            {sponsor.status ? 'Ativo' : 'Inativo'}
                          </span>
                        </span>
                        <Button
                          variant="outline"
                          disabled={toggleSponsorMutation.isPending}
                          onClick={() =>
                            toggleSponsorMutation.mutate({
                              id: sponsor.id,
                              status: !sponsor.status,
                            })
                          }
                          className={
                            sponsor.status
                              ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                              : undefined
                          }
                        >
                          {isUpdating
                            ? 'Salvando...'
                            : sponsor.status
                            ? 'Desativar'
                            : 'Ativar'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
