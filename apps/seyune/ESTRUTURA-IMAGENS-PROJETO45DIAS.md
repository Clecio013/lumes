# Estrutura de Imagens - Projeto 45 Dias

## Organização das Pastas

```
/public/projeto45dias/
├── seyune-amauri-hero.png          # Foto dos dois juntos (hero section)
├── seyune/
│   ├── ensaio/
│   │   ├── foto1.jpg               # Fotos do ensaio da Seyune
│   │   ├── foto2.jpg
│   │   └── ...
│   └── perfil.png                  # Foto de perfil para About Section
├── amauri/
│   ├── ensaio/
│   │   ├── foto1.jpg               # Fotos do ensaio do Amauri
│   │   ├── foto2.jpg
│   │   └── ...
│   └── perfil.png                  # Foto de perfil para About Section
└── transformacao/
    ├── enzo/
    │   ├── antes.png               # Foto antes - Enzo
    │   └── depois.png              # Foto depois - Enzo
    ├── elizabeth/
    │   ├── antes.png               # Foto antes - Elizabeth
    │   └── depois.png              # Foto depois - Elizabeth
    └── [cliente3]/
        ├── antes.png
        └── depois.png
```

## Imagens Atuais Configuradas

### Hero Section
- **Caminho:** `/projeto45dias/seyune-amauri-hero.png`
- **Descrição:** Foto dos dois profissionais juntos
- **Tamanho recomendado:** 800x1000px (proporção 4:5)

### About Section - Seyune
- **Caminho atual:** `/images/seyune/ensaio/image1.jpg`
- **Novo caminho recomendado:** `/projeto45dias/seyune/perfil.png`
- **Descrição:** Foto profissional da Seyune
- **Tamanho recomendado:** 600x800px (proporção 3:4)

### About Section - Amauri
- **Caminho atual:** `/projeto45dias/amauri/ensaio.png`
- **Descrição:** Foto profissional do Amauri
- **Tamanho recomendado:** 600x800px (proporção 3:4)

### Transformações - Enzo
- **Antes:** `/projeto45dias/transformacao/enzo/antes.png`
- **Depois:** `/projeto45dias/transformacao/enzo/depois.png`
- **Tamanho recomendado:** 400x600px (proporção 2:3)

### Transformações - Elizabeth
- **Antes:** `/projeto45dias/transformacao/elizabeth/antes.png`
- **Depois:** `/projeto45dias/transformacao/elizabeth/depois.png`
- **Tamanho recomendado:** 400x600px (proporção 2:3)

## Como Atualizar

1. **Coloque as imagens nas pastas correspondentes** seguindo a estrutura acima
2. **Certifique-se que os nomes dos arquivos estão corretos**
3. **Otimize as imagens** (use WebP ou PNG com compressão)
4. **Dimensões máximas recomendadas:**
   - Hero: 1200x1500px
   - Perfis: 800x1000px
   - Transformações: 600x800px

## Próximos Passos

Se precisar atualizar os caminhos no código:
- Hero Section: `src/app/projeto45dias/components/hero-section.tsx` (linha 42)
- About Section: `src/app/projeto45dias/components/about-section.tsx` (linhas 34, 57)
- Transformations: `src/app/projeto45dias/components/transformations-section.tsx` (linhas 22-40)
