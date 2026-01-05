import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Music, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [newSponsorName, setNewSponsorName] = useState('');
  const [newSponsorFile, setNewSponsorFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [musicFile, setMusicFile] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await base44.auth.me();
      if (currentUser.email === 'pedrovictor.net@gmail.com') {
        setUser(currentUser);
      }
    } catch (error) {
      console.log('Not authenticated');
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (
      loginEmail === 'pedrovictor.net@gmail.com' &&
      loginPassword === '123456'
    ) {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          base44.auth.redirectToLogin(window.location.pathname);
        } else {
          checkAuth();
        }
      } catch (error) {
        toast.error('Erro ao fazer login');
      }
    } else {
      toast.error('Credenciais inválidas');
    }
  };

  const { data: sponsors = [], isLoading: loadingSponsors } = useQuery({
    queryKey: ['sponsors'],
    queryFn: () => base44.entities.Sponsor.list('order', 100),
    enabled: !!user,
  });

  const { data: siteConfig } = useQuery({
    queryKey: ['siteConfig'],
    queryFn: async () => {
      const configs = await base44.entities.SiteConfig.list();
      return configs[0] || null;
    },
    enabled: !!user,
  });

  const deleteSponsorMutation = useMutation({
    mutationFn: (id) => base44.entities.Sponsor.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sponsors'] });
      toast.success('Patrocinador removido');
    },
  });

  const addSponsorMutation = useMutation({
    mutationFn: async (data) => {
      setUploading(true);
      const { file_url } = await base44.integrations.Core.UploadFile({
        file: newSponsorFile,
      });
      await base44.entities.Sponsor.create({
        name: data.name,
        logo_url: file_url,
        order: sponsors.length,
      });
      setUploading(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sponsors'] });
      setNewSponsorName('');
      setNewSponsorFile(null);
      toast.success('Patrocinador adicionado');
    },
  });

  const updateMusicMutation = useMutation({
    mutationFn: async () => {
      setUploading(true);
      const { file_url } = await base44.integrations.Core.UploadFile({
        file: musicFile,
      });
      if (siteConfig) {
        await base44.entities.SiteConfig.update(siteConfig.id, {
          music_url: file_url,
        });
      } else {
        await base44.entities.SiteConfig.create({
          music_url: file_url,
          music_enabled: true,
        });
      }
      setUploading(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteConfig'] });
      setMusicFile(null);
      toast.success('Música atualizada');
    },
  });

  const toggleMusicMutation = useMutation({
    mutationFn: async (enabled) => {
      if (siteConfig) {
        await base44.entities.SiteConfig.update(siteConfig.id, {
          music_enabled: enabled,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteConfig'] });
    },
  });

  if (loading) {
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
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Senha"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-bold"
              >
                Entrar
              </Button>
            </form>
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
              base44.auth.logout();
              setUser(null);
            }}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Sair
          </Button>
        </div>

        {/* Música de Fundo */}
        <Card className="mb-8 bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lime-400">
              <Music className="w-5 h-5" />
              Música de Fundo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-400">Música Habilitada:</span>
              <Switch
                checked={siteConfig?.music_enabled || false}
                onCheckedChange={(checked) =>
                  toggleMusicMutation.mutate(checked)
                }
              />
            </div>
            {siteConfig?.music_url && (
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Música atual:</p>
                <audio controls className="w-full">
                  <source src={siteConfig.music_url} type="audio/mpeg" />
                </audio>
              </div>
            )}
            <div className="flex gap-2">
              <Input
                type="file"
                accept="audio/*"
                onChange={(e) => setMusicFile(e.target.files[0])}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button
                onClick={() => musicFile && updateMusicMutation.mutate()}
                disabled={!musicFile || uploading}
                className="bg-lime-500 hover:bg-lime-400 text-black font-bold"
              >
                {uploading ? 'Enviando...' : 'Upload'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Adicionar Patrocinador */}
        <Card className="mb-8 bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lime-400">
              <Plus className="w-5 h-5" />
              Adicionar Patrocinador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                placeholder="Nome do Patrocinador"
                value={newSponsorName}
                onChange={(e) => setNewSponsorName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white flex-1"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setNewSponsorFile(e.target.files[0])}
                className="bg-gray-800 border-gray-700 text-white flex-1"
              />
              <Button
                onClick={() =>
                  newSponsorName &&
                  newSponsorFile &&
                  addSponsorMutation.mutate({ name: newSponsorName })
                }
                disabled={!newSponsorName || !newSponsorFile || uploading}
                className="bg-lime-500 hover:bg-lime-400 text-black font-bold"
              >
                {uploading ? 'Enviando...' : 'Adicionar'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Patrocinadores */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lime-400">
              Patrocinadores ({sponsors.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSponsors ? (
              <p className="text-gray-400">Carregando...</p>
            ) : sponsors.length === 0 ? (
              <p className="text-gray-400">Nenhum patrocinador cadastrado</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={sponsor.logo_url}
                        alt={sponsor.name}
                        className="w-16 h-16 object-contain bg-white rounded"
                      />
                      <span className="font-semibold">{sponsor.name}</span>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteSponsorMutation.mutate(sponsor.id)}
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
