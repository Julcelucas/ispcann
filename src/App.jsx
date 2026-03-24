import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import detailedNewsDefault from "./data/news.json";
import libraryDepartmentsDefault from "./data/libraries.json";
import { usePersistentCollection } from "./hooks/usePersistentCollection";

const navigation = [
  { label: "Inicio", to: "/" },
  { label: "Cursos", to: "/cursos" },
  { label: "Noticias", to: "/noticias" },
  { label: "Biblioteca", to: "/biblioteca" },
  { label: "Radio", to: "/radio" },
  { label: "Sobre", to: "/sobre" },
  { label: "Pesquisa", to: "/pesquisa" },
];

const highlights = [
  {
    title: "Excelencia Academica",
    description:
      "Formacao alinhada com exigencias profissionais e rigor pedagogico em cada curso.",
  },
  {
    title: "Inovacao Aplicada",
    description:
      "Aprendizagem com foco em tecnologia, investigacao e impacto real na comunidade.",
  },
  {
    title: "Empregabilidade",
    description:
      "Preparacao pratica para o mercado, com orientacao para competencias do futuro.",
  },
];

const departments = [
  {
    icon: "/imagens/Depart/sociolo.png",
    title: "Ciencias Sociais, Humanas e Economicas",
    text: "Programas focados em desenvolvimento social, cidadania e gestao publica.",
  },
  {
    icon: "/imagens/Depart/computador1.png",
    title: "Engenharia e Tecnologias",
    text: "Cursos tecnicos e profissionais para acelerar inovacao e transformacao digital.",
  },
  {
    icon: "/imagens/Depart/medicine1.png",
    title: "Ciencias da Saude",
    text: "Formacao orientada para cuidados de saude, etica e qualidade assistencial.",
  },
];

const heroSlides = [
  {
    image: "/imagens/slides/imagem1.jpg",
    eyebrow: "Campus e Comunidade",
    title: "Ambiente academico vibrante e conectado com o futuro.",
  },
  {
    image: "/imagens/slides/imagem2.jpg",
    eyebrow: "Qualidade e Presenca",
    title: "Formacao profissional com impacto real em Malanje e em Angola.",
  },
  {
    image: "/imagens/colegas.jpg",
    eyebrow: "Talento em Acao",
    title: "Estudantes preparados para liderar, investigar e transformar.",
  },
];

const courses = [
  {
    title: "Direito",
    department: "Ciencias Sociais",
    summary: "Formacao juridica orientada para interpretacao, pratica e responsabilidade social.",
    image: "/nav/imagens/cursos/imagem1-p.jpg",
  },
  {
    title: "Economia",
    department: "Ciencias Sociais",
    summary: "Analise economica aplicada ao desenvolvimento regional e nacional.",
    image: "/nav/imagens/cursos/imagem1-p.jpg",
  },
  {
    title: "Engenharia Informatica",
    department: "Engenharia e Tecnologias",
    summary: "Bases solidas em software, sistemas, redes e transformacao digital.",
    image: "/nav/imagens/cursos/imagem2-p.jpg",
  },
  {
    title: "Engenharia de Telecomunicacoes e Electronica",
    department: "Engenharia e Tecnologias",
    summary: "Infraestruturas, comunicacoes e inovacao tecnologica para o mercado moderno.",
    image: "/nav/imagens/cursos/imagem2-p.jpg",
  },
  {
    title: "Enfermagem",
    department: "Ciencias da Saude",
    summary: "Formacao humana e tecnica para cuidados de saude com qualidade e etica.",
    image: "/nav/imagens/cursos/imagem3-p.png",
  },
  {
    title: "Fisioterapia",
    department: "Ciencias da Saude",
    summary: "Competencias praticas para reabilitacao e bem-estar funcional.",
    image: "/nav/imagens/cursos/imagem3-p.png",
  },
];

const libraryFallbackImages = {
  engenharias: "/nav/imagens/biblioteca/biblioteca-engenharias.svg",
  sociais: "/nav/imagens/biblioteca/biblioteca-sociais.svg",
  saude: "/nav/imagens/biblioteca/biblioteca-saude.svg",
};

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState("");
  const [newsItems, setNewsItems] = usePersistentCollection("ispcan-news", detailedNewsDefault);
  const [libraryDepartments, setLibraryDepartments] = usePersistentCollection(
    "ispcan-libraries",
    libraryDepartmentsDefault
  );

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    const query = searchDraft.trim();
    navigate(query ? `/pesquisa?q=${encodeURIComponent(query)}` : "/pesquisa");
  }

  function handleAddNews(newsDraft) {
    setNewsItems((current) => [{ ...newsDraft }, ...current]);
  }

  function handleDeleteNews(slug) {
    setNewsItems((current) => current.filter((item) => item.slug !== slug));
  }

  function handleAddBook(departmentId, bookDraft) {
    setLibraryDepartments((current) =>
      current.map((department) =>
        department.id === departmentId
          ? { ...department, books: [bookDraft, ...department.books] }
          : department
      )
    );
  }

  function handleDeleteBook(departmentId, bookTitle) {
    setLibraryDepartments((current) =>
      current.map((department) =>
        department.id === departmentId
          ? {
              ...department,
              books: department.books.filter((book) => book.title !== bookTitle),
            }
          : department
      )
    );
  }

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <span className="blob blob-one" />
        <span className="blob blob-two" />
        <span className="grid-overlay" />
      </div>

      <header className="topbar" id="inicio">
        <NavLink className="brand" to="/">
          <img src="/imagens/cardeal-ico.png" alt="Logo ISPCAN" />
          <div>
            <strong>ISPCAN</strong>
            <small>Instituto Superior Politecnico</small>
          </div>
        </NavLink>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav aria-label="Navegacao principal" className={menuOpen ? "main-nav open" : "main-nav"}>
          <ul>
            {navigation.map((item) => (
              <li key={item.label}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <form className="top-search" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            value={searchDraft}
            onChange={(event) => setSearchDraft(event.target.value)}
            placeholder="Pesquisar noticias, cursos e livros"
            aria-label="Pesquisar"
          />
          <button type="submit">Pesquisar</button>
        </form>
      </header>

      <main>
        <div key={location.pathname} className="route-shell route-enter">
          <Routes>
            <Route path="/" element={<HomePage newsItems={newsItems} />} />
            <Route path="/cursos" element={<CoursesPage />} />
            <Route
              path="/noticias"
              element={<NewsPage newsItems={newsItems} onAddNews={handleAddNews} onDeleteNews={handleDeleteNews} />}
            />
            <Route path="/noticias/:slug" element={<NewsDetailPage newsItems={newsItems} />} />
            <Route path="/biblioteca" element={<LibraryHubPage libraryDepartments={libraryDepartments} />} />
            <Route
              path="/biblioteca/:departmentId"
              element={
                <LibraryDepartmentPage
                  libraryDepartments={libraryDepartments}
                  onAddBook={handleAddBook}
                  onDeleteBook={handleDeleteBook}
                />
              }
            />
            <Route path="/radio" element={<RadioPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route
              path="/pesquisa"
              element={<SearchPage newsItems={newsItems} libraryDepartments={libraryDepartments} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <footer className="footer" id="contactos">
        <div className="footer-grid section-shell">
          <div>
            <h3>Localizacao</h3>
            <p>Bairro Catepa, Zona da Voanvoala do Meio, por detras do IMNE - Malanje.</p>
          </div>
          <div>
            <h3>Contactos</h3>
            <p>Telefone: 940 928 490</p>
            <p>Email: ispcan22@gmail.com</p>
          </div>
          <div>
            <h3>Atendimento</h3>
            <p>Segunda a Sexta: 08:00 - 18:00</p>
            <p>Sabado: 08:00 - 12:00</p>
          </div>
          <div>
            <h3>Ligacoes rapidas</h3>
            <p>
              <NavLink to="/biblioteca">Biblioteca Virtual</NavLink>
            </p>
            <p>
              <NavLink to="/radio">Radio Online</NavLink>
            </p>
          </div>
        </div>

        <p className="copyright">Copyright 2026 ISPCAN. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}

function HomePage({ newsItems }) {
  return (
    <>
      <section className="hero section-shell page-enter">
        <div>
          <p className="eyebrow">Portal Oficial</p>
          <h1>Formar lideres, impulsionar talento e transformar o futuro em Malanje.</h1>
          <p className="hero-text">
            Bem-vindo ao portal online do Instituto Superior Politecnico Dom Alexandre Cardeal do Nascimento.
            Um ecossistema academico moderno, orientado para excelencia, inovacao e impacto social.
          </p>
          <div className="hero-actions">
            <NavLink to="/cursos" className="btn btn-primary">
              Ver Cursos
            </NavLink>
            <NavLink to="/sobre" className="btn btn-secondary">
              Conhecer o ISPCAN
            </NavLink>
          </div>
        </div>

        <HeroShowcase />
      </section>

      <section className="highlights section-shell">
        {highlights.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="departments section-shell" id="departamentos">
        <div className="section-title">
          <p className="eyebrow">Departamentos e Cursos</p>
          <h2>Estrutura academica multidisciplinar</h2>
          <p>
            O ISPCAN atua nas areas Sociais, Engenharia e Saude, com programas desenhados para necessidades reais
            do mercado angolano.
          </p>
        </div>

        <div className="department-grid">
          {departments.map((dept) => (
            <article key={dept.title} className="department-card">
              <img src={dept.icon} alt="Icone do departamento" />
              <h3>{dept.title}</h3>
              <p>{dept.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="news section-shell" id="noticias">
        <div className="section-title">
          <p className="eyebrow">Noticias e Eventos</p>
          <h2>Actualizacoes da comunidade academica</h2>
        </div>

        <div className="news-grid">
          {newsItems.slice(0, 3).map((item) => (
            <article key={item.slug} className="news-card">
              <img src={item.image} alt={item.title} />
              <div>
                <p className="date">{item.date}</p>
                <h3>{item.title}</h3>
                <NavLink to={`/noticias/${item.slug}`}>Ler noticia completa</NavLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about section-shell" id="sobre">
        <div className="section-title">
          <p className="eyebrow">Quem Somos</p>
          <h2>Uma instituicao comprometida com transformacao social</h2>
        </div>

        <div className="about-layout">
          <img src="/imagens/colegas.jpg" alt="Estudantes do ISPCAN" />
          <div>
            <p>
              O Instituto Superior Politecnico Dom Alexandre Cardeal do Nascimento e referencia em ensino superior
              na provincia de Malanje, com foco em excelencia academica e desenvolvimento integral dos estudantes.
            </p>
            <p>
              A nossa missao e capacitar jovens com conhecimentos tecnicos, pensamento critico e valores eticos para
              responder aos desafios contemporaneos de Angola.
            </p>
            <p>
              Seja estudante, profissional ou parceiro institucional, o ISPCAN oferece um ambiente de aprendizagem
              dinamico, inclusivo e orientado para resultados.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timerId);
  }, []);

  const activeSlide = heroSlides[activeIndex];

  return (
    <aside className="hero-showcase" aria-label="Destaques visuais do ISPCAN">
      <img src={activeSlide.image} alt={activeSlide.title} className="hero-showcase-image" />
      <div className="hero-showcase-overlay">
        <p className="eyebrow">{activeSlide.eyebrow}</p>
        <h2>{activeSlide.title}</h2>
        <ul className="hero-metrics">
          <li>
            <strong>3</strong>
            <span>Departamentos</span>
          </li>
          <li>
            <strong>+20</strong>
            <span>Cursos</span>
          </li>
          <li>
            <strong>ISPCAN</strong>
            <span>Portal Oficial</span>
          </li>
        </ul>
        <div className="hero-dots" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={index === activeIndex ? "hero-dot active" : "hero-dot"}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function CoursesPage() {
  return (
    <section className="section-shell inner-page page-enter">
      <div className="section-title">
        <p className="eyebrow">Cursos</p>
        <h2>Oferta Formativa 2023/2024</h2>
        <p>
          Programas de licenciatura distribuidos em Ciencias Sociais, Engenharia e Ciencias da Saude, desenhados para
          formar profissionais com alta capacidade tecnica e compromisso etico.
        </p>
      </div>

      <div className="course-grid">
        {courses.map((course) => (
          <article key={course.title} className="course-card">
            <img src={course.image} alt={course.title} />
            <div>
              <p className="course-tag">{course.department}</p>
              <h3>{course.title}</h3>
              <p>{course.summary}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="price-panel">
        <h3>Requisitos para inscricao</h3>
        <p>BI, certificado do medio, capa de processo, 3 fotografias e pagamento de taxa de inscricao.</p>
        <p>Propinas de referencia: Sociais 21.000,00 | Engenharias 23.000,00 | Saude 23.000,00.</p>
      </div>
    </section>
  );
}

function NewsPage({ newsItems, onAddNews, onDeleteNews }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    image: "/nav/noticias/imagens/imagem1.jpg",
    paragraphs: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    const title = form.title.trim();
    if (!title) {
      return;
    }

    const slug = slugify(title);
    const paragraphs = form.paragraphs
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    onAddNews({
      slug,
      title,
      date: form.date.trim() || "Nova noticia",
      image: form.image.trim() || "/nav/noticias/imagens/imagem1.jpg",
      paragraphs: paragraphs.length > 0 ? paragraphs : ["Conteudo em actualizacao."],
    });

    setForm({
      title: "",
      date: "",
      image: "/nav/noticias/imagens/imagem1.jpg",
      paragraphs: "",
    });
  }

  return (
    <section className="section-shell inner-page page-enter">
      <div className="section-title">
        <p className="eyebrow">Portal de Noticias</p>
        <h2>Comunicacao institucional actualizada</h2>
        <p>
          Acompanhe eventos, avisos importantes, actividades academicas e iniciativas da comunidade ISPCAN em tempo
          real.
        </p>
      </div>

      <div className="news-grid news-grid-full">
        {newsItems.map((item) => (
          <article key={item.slug} className="news-card admin-card">
            <img src={item.image} alt={item.title} />
            <div>
              <p className="date">{item.date}</p>
              <h3>{item.title}</h3>
              <div className="card-actions">
                <NavLink to={`/noticias/${item.slug}`}>Abrir noticia</NavLink>
                <button type="button" className="danger-button" onClick={() => onDeleteNews(item.slug)}>
                  Eliminar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="admin-panel">
        <div className="section-title compact">
          <p className="eyebrow">Gestao de Noticias</p>
          <h2>Adicionar nova noticia</h2>
        </div>
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="Titulo da noticia"
          />
          <input
            type="text"
            value={form.date}
            onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
            placeholder="Data da noticia"
          />
          <input
            type="text"
            value={form.image}
            onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))}
            placeholder="Caminho da imagem a partir da raiz"
          />
          <textarea
            value={form.paragraphs}
            onChange={(event) => setForm((current) => ({ ...current, paragraphs: event.target.value }))}
            placeholder="Escreva um paragrafo por linha"
            rows={6}
          />
          <button type="submit" className="btn btn-primary">
            Adicionar noticia
          </button>
        </form>
      </section>
    </section>
  );
}

function NewsDetailPage({ newsItems }) {
  const { slug } = useParams();
  const post = newsItems.find((item) => item.slug === slug);

  if (!post) {
    return <Navigate to="/noticias" replace />;
  }

  return (
    <section className="section-shell inner-page page-enter">
      <div className="article-shell">
        <img src={post.image} alt={post.title} className="article-cover" />
        <p className="date">{post.date}</p>
        <h1>{post.title}</h1>
        {post.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="back-row">
        <NavLink to="/noticias" className="btn btn-secondary">
          Voltar para noticias
        </NavLink>
      </div>
    </section>
  );
}

function LibraryHubPage({ libraryDepartments }) {
  return (
    <section className="section-shell inner-page page-enter">
      <div className="section-title">
        <p className="eyebrow">Biblioteca Online</p>
        <h2>Acervo digital por departamento</h2>
        <p>
          Selecione uma area para pesquisar materiais de estudo com curadoria academica do ISPCAN.
        </p>
      </div>

      <div className="library-grid">
        {libraryDepartments.map((department) => (
          <article key={department.id} className="library-card">
            <img
              src={libraryFallbackImages[department.id] || department.image || "/nav/imagens/biblioteca/biblioteca-1.jpg"}
              alt={department.title}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  libraryFallbackImages[department.id] || "/nav/imagens/biblioteca/biblioteca-1.jpg";
              }}
            />
            <div>
              <h3>{department.title}</h3>
              <p>{department.description}</p>
              <NavLink to={`/biblioteca/${department.id}`}>Explorar acervo</NavLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LibraryDepartmentPage({ libraryDepartments, onAddBook, onDeleteBook }) {
  const { departmentId } = useParams();
  const department = libraryDepartments.find((item) => item.id === departmentId);
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("Todas");
  const [form, setForm] = useState({ title: "", author: "", year: "", area: "", link: "/nav/link/link-biblioteca/Livros/livro1.pdf" });

  if (!department) {
    return <Navigate to="/biblioteca" replace />;
  }

  const areas = ["Todas", ...new Set(department.books.map((book) => book.area))];

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return department.books.filter((book) => {
      const areaMatch = area === "Todas" || book.area === area;
      const queryMatch =
        normalizedQuery.length === 0 ||
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.author.toLowerCase().includes(normalizedQuery);
      return areaMatch && queryMatch;
    });
  }, [department.books, query, area]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim()) {
      return;
    }

    onAddBook(department.id, {
      title: form.title.trim(),
      author: form.author.trim() || "Autor nao informado",
      year: form.year.trim() || "2026",
      area: form.area.trim() || department.title,
      link: form.link.trim() || "/nav/link/link-biblioteca/Livros/livro1.pdf",
    });

    setForm({ title: "", author: "", year: "", area: "", link: "/nav/link/link-biblioteca/Livros/livro1.pdf" });
  }

  return (
    <section className="section-shell inner-page page-enter">
      <div className="section-title">
        <p className="eyebrow">Biblioteca</p>
        <h2>{department.title}</h2>
        <p>{department.description}</p>
      </div>

      <div className="library-tools">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Pesquisar por titulo ou autor"
          aria-label="Pesquisar livros"
        />
        <select value={area} onChange={(event) => setArea(event.target.value)} aria-label="Filtrar por area">
          {areas.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        <table className="library-table">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Autor</th>
              <th>Ano</th>
              <th>Area</th>
              <th>Download</th>
              <th>Accoes</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={`${book.title}-${book.author}`}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.area}</td>
                <td>
                  <a href={book.link} target="_blank" rel="noreferrer">
                    Abrir
                  </a>
                </td>
                <td>
                  <button
                    type="button"
                    className="danger-button small"
                    onClick={() => onDeleteBook(department.id, book.title)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBooks.length === 0 && <p className="empty-state">Nenhum material encontrado para este filtro.</p>}

      <section className="admin-panel">
        <div className="section-title compact">
          <p className="eyebrow">Gestao de Livros</p>
          <h2>Adicionar novo livro</h2>
        </div>
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="Titulo do livro"
          />
          <input
            type="text"
            value={form.author}
            onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))}
            placeholder="Autor"
          />
          <input
            type="text"
            value={form.year}
            onChange={(event) => setForm((current) => ({ ...current, year: event.target.value }))}
            placeholder="Ano"
          />
          <input
            type="text"
            value={form.area}
            onChange={(event) => setForm((current) => ({ ...current, area: event.target.value }))}
            placeholder="Area de estudo"
          />
          <input
            type="text"
            value={form.link}
            onChange={(event) => setForm((current) => ({ ...current, link: event.target.value }))}
            placeholder="Caminho do PDF a partir da raiz"
          />
          <button type="submit" className="btn btn-primary">
            Adicionar livro
          </button>
        </form>
      </section>

      <div className="back-row">
        <NavLink to="/biblioteca" className="btn btn-secondary">
          Voltar para departamentos
        </NavLink>
      </div>
    </section>
  );
}

function RadioPage() {
  return (
    <section className="section-shell inner-page page-enter">
      <div className="section-title">
        <p className="eyebrow">Radio Online</p>
        <h2>Conteudo institucional em tempo real</h2>
        <p>
          A radio online do ISPCAN transmite informacao, cultura e actualizacoes para toda a comunidade academica.
        </p>
      </div>

      <article className="radio-card">
        <img src="/nav/nav-img/jovem.jpg" alt="Radio ISPCAN" />
        <div>
          <h3>Transmissao ao vivo</h3>
          <p>Mantenha-se conectado e acompanhe os principais temas da nossa comunidade.</p>
          <audio src="https://paineldj6.com.br:20116/stream" controls preload="metadata" />
          <p className="radio-note">OBS: A transmissao pode apresentar conteudo de teste em alguns periodos.</p>
        </div>
      </article>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="section-shell inner-page page-enter">
      <div className="section-title">
        <p className="eyebrow">Sobre o ISPCAN</p>
        <h2>Educacao superior com foco em impacto e inovacao</h2>
      </div>

      <div className="about-layout">
        <img src="/nav/imagens/sobre/imagm1.jpg" alt="Missao ISPCAN" />
        <div>
          <p>
            O Instituto Superior Politecnico Cardeal Dom Alexandre do Nascimento e uma instituicao de ensino superior
            em Malanje, dedicada a formacao de profissionais competentes e eticamente comprometidos.
          </p>
          <p>
            A missao institucional inclui qualidade de ensino, pesquisa cientifica e contribuicao directa para o
            desenvolvimento socioeconomico da regiao e do pais.
          </p>
          <p>
            Com infraestrutura moderna e comunidade academica engajada, o ISPCAN consolida-se como um polo de
            conhecimento e progresso em Angola.
          </p>
        </div>
      </div>
    </section>
  );
}

function SearchPage({ newsItems, libraryDepartments }) {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) {
      return [];
    }

    const courseResults = courses
      .filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.department.toLowerCase().includes(query) ||
          course.summary.toLowerCase().includes(query)
      )
      .map((course) => ({
        type: "Curso",
        title: course.title,
        description: course.summary,
        link: "/cursos",
      }));

    const newsResults = newsItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.paragraphs.some((paragraph) => paragraph.toLowerCase().includes(query))
      )
      .map((item) => ({
        type: "Noticia",
        title: item.title,
        description: item.date,
        link: `/noticias/${item.slug}`,
      }));

    const bookResults = libraryDepartments.flatMap((department) =>
      department.books
        .filter(
          (book) =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.area.toLowerCase().includes(query)
        )
        .map((book) => ({
          type: "Livro",
          title: book.title,
          description: `${book.author} · ${department.title}`,
          link: `/biblioteca/${department.id}`,
        }))
    );

    return [...courseResults, ...newsResults, ...bookResults];
  }, [libraryDepartments, newsItems, query]);

  return (
    <section className="section-shell inner-page page-enter">
      <div className="section-title">
        <p className="eyebrow">Pesquisa Global</p>
        <h2>Resultados para {query || "toda a plataforma"}</h2>
        <p>Pesquise cursos, noticias e materiais da biblioteca a partir de um unico ponto.</p>
      </div>

      {!query && <p className="empty-state">Introduza um termo de pesquisa no topo do site.</p>}

      {query && results.length === 0 && <p className="empty-state">Nenhum resultado encontrado.</p>}

      <div className="result-grid">
        {results.map((result) => (
          <article key={`${result.type}-${result.title}`} className="result-card">
            <p className="result-type">{result.type}</p>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
            <NavLink to={result.link}>Abrir</NavLink>
          </article>
        ))}
      </div>
    </section>
  );
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default App;
