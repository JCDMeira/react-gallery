# Projeto de uma galeria com infinity scroll em react

<p align="center">
  <image
  src="https://img.shields.io/github/languages/count/JCDMeira/react-gallery"
  />
  <image
  src="https://img.shields.io/github/languages/top/JCDMeira/react-gallery"
  />
  <image
  src="https://img.shields.io/github/last-commit/JCDMeira/react-gallery"
  />
  <image
  src="https://img.shields.io/github/watchers/JCDMeira/react-gallery?style=social"
  />
</p>

# 📋 Indíce

- [Proposta](#id01)
  - [Conclusões](#id01.01)
- [Feito com](#id04)
- [Pré-requisitos](#id05)
- [Procedimentos de instalação](#id06)
- [Autor](#id07)

# 🚀 Proposta <a name="id01"></a>

Tem como objetio criar uma galeria com imagens do unsplash e mostrar imagens paginadas. Com sistema de infinity scroll.
Ao chegar no final de cada página é requisitado mais medias.

## Conclusões <a name="id01.01"></a>

O projeto mostra uma aplicação singela que serve muito bem como objeto de estudo sobre alguns limites papáveis de como aplicar exatamente o modelo de infinity scroll e gerenciar a máquina de estado criada.

Inicialmente a aplicação continha muitos estados diretamente acessados no escopo de app. Em primeiro momento se iidealizou o uso de um sistema de store com o zustand. Igualmente usado na aplicação de [clothing store](https://github.com/JCDMeira/clothing-store), mas diferente do modelo que envelopa as lógicas e trata de ações de crud e um modelo de ações desdobraveis de tela que são sempre as mesmas, a atual aplicação precisa lidar com ações paginadas, o que não faz o modelo fica bom.
Devido a necessidade de interação da informação de dentro da store ao chamar uma função, talvez com uso de modelo de actions do Flux usando zustand poderia obter um resultado melhor, mas o modelo ficaria mais engessado.

Outra possibilidade é usar de forma mais direta um swr ou react query para tratar a requisição e paginação. E em modelos mais complexos seria possível usar o swr/react-query juntamente a um modelo de custom hook, dessa forma o hook seria chamada de forma direta, mas a lib sustentaria em cache o tratamento, enquanto as informações de chamada estariam, em suma maioria, em querys ou stores que seriam acessadas dentro do custom hook.

A exemplo de nível de permissão em um token de usuário, query de search, filtros e tags de ordenação. Dessa forma ao usar a informação em lugares repetidos não precisaria remontar a mesma chamada para aproveitar do cache, diminuindo imports.

Uma outra forma que seria viável é o uso de conteiner pattern, em que as montagens de interação entre as camadas ocorrem em um conteiner criado, então todas ações são orientadas a conteiner.

```tsx
//@ store não é um bom case para isso, a não ser que fosse modelado de forma diferente
//@ talvez com o modelo de actions, ou mesmo desenhado para absorver as lógicas de tratamento envolvendo um crud, similar a aplicação de clothing store
//@ no formato atual com page e e query não parece funcionar muito bem
//@ talvez esse modelo de store seja melhor com ações não paginadas
//! mas é possível testar aderir um swr e fazer funcionar um modelo híbrido com store.
//! porém vale lembrar que o próprio swr faz o sistema de cache, que possibilita tratar o uso de informações que ele tem em cache
//! talvez de pra fazer uma view-model com swr + custom hook
//# talvez até orientar a eventos ou conteiner, e envelopar certas condições, para quando precisar chamar o dado
//# em um cenário que o conteiner tenha acesso as querys, ids ou infos globais da store responsável
const photos = imagesStore((state) => state.photos);
const setPhotos = imagesStore((state) => state.setPhotos);
const query = imagesStore((state) => state.query);
const setQuery = imagesStore((state) => state.setQuery);
const page = imagesStore((state) => state.page);
const setPage = imagesStore((state) => state.setPage);
const fetchMore = imagesStore((state) => state.fetchMore);
//@ se criar forma de store da pra fazer todos estados estarem na store
const [loading, setLoading] = useState(false); //loading

//@ isola função em um fetch a parte
const fetchImages = async () => {
  setLoading(true);
  try {
    const data = await getImages({ page, query });
    setPhotos(data);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

//@ talvez compense fazer um sistemas de store
useEffect(() => {
  fetchImages();
}, [page, query]);

//@ será que tem como fazer um sistema de pagination com store ou sem usar useEffect
useEffect(() => {
  window.addEventListener("scroll", () => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
    ) {
      fetchMore();
    }
  });
  return () => window.removeEventListener("scroll", () => {});
}, []);

const handleSubmit = (e: SyntheticEvent) => {
  e.preventDefault();
  setPage(1);
  fetchImages();
};
```

# 🛠 Feito com <a name="id04"></a>

<br />

- [React](https://reactjs.org/)
- css
- [Vite](https://vitejs.dev)

<br />

# ☑️ Pré-requisitos <a name="id05"></a>

<br />

- [x] Editor de código de sua preferência (recomendado VS code)
- [x] Git
- [x] Gerenciador de pacotes Yarn ou NPM

<br />

# 📝 Procedimentos de instalação <a name="id06"></a>

<br />

Clone este repositório usando o comando:

```bash
git clone https://github.com/JCDMeira/react-gallery.git
```

Na pasta do projeto instale as dependências com uso do npm ou yarn

```bash
npm install

ou

yarn install
```

Inicie o projeto com

```bash
npm start

ou

yarn start
```

<br />

# :sunglasses: Autor <a name="id07"></a>

<br />

- Linkedin - [jeanmeira](https://www.linkedin.com/in/jeanmeira/)
- Instagram - [@jean.meira10](https://www.instagram.com/jean.meira10/)
- GitHub - [JCDMeira](https://github.com/JCDMeira)
