export default class Data {
    constructor() {
        this.data = [];
        this.result = {
            'A': 0,
            'B': 0,
            'C': 0,
            'D': 0,
            'E': 0,
            'F': 0,
            'G': 0,
            'H': 0,
            'I': 0,
            'J': 0,
        };
    }

    init() {
        this.data.push([[
            [
                ['H', "Visitar museus, exposições e feiras de arte"],
                ['I', "Assistir televisão"],
                ['F', "Participar de uma ONG de defesa do meio ambiente"],
                ['B', "Assistir a séries, seriados ou filmes sobre justiça"],
                ['D', "Fazer experiências no laboratório da escola"],
                ['E', "Acompanhar a rentabilidade dos investimentos financeiros nos jornais"],
                ['A', "Pesquisar Atlas do corpo humano"],
                ['C', "Conversar sobre os problemas pessoais dos seus amigos"],
                ['G', "Desmontar pequenos aparelhos para saber como funciona"],
                ['J', "Esportes"],
            ], [
                ['F', "Assistir à documentários sobre o meio ambiente"],
                ['H', "Desenhar páginas para a Internet"],
                ['A', "Ler artigos sobre saúde"],
                ['D', "Conhecer laboratórios de pesquisas de Universidades"],
                ['I', "Escrever artigos e reportagens para o jornal da escola"],
                ['E', "Liderar grupos de trabalho na Escola"],
                ['J', "Planejar com detalhes as viagens de férias"],
                ['C', "Conversar com pessoas idosas ou doentes"],
                ['G', "Estudar informática"],
                ['B', "Ler artigos sobre a realidade nacional"],
            ], [
                ['A', "Ver documentários sobre medicina e saúde"],
                ['C', "Atuar em uma ONG de defesa dos Direitos Humanos"],
                ['H', "Desenhar modelos de roupas acessórios"],
                ['E', "Trabalhar na comissão de formatura"],
                ['J', "Frequentar uma academia e cultivar o corpo"],
                ['G', "Aprender a instalar componentes de computadores"],
                ['I', "Fotografar e fazer gravações em vídeo de amigos e parentes"],
                ['B', "Participar de uma Ong em sua comunidade"],
                ['F', "Ler sobre o efeito estufa e o fenômeno “El Niño”"],
                ['D', "Resolver quebra-cabeças de matemática"],
            ], [
                ['A', "Ler sobre engenharia genética"],
                ['H', "Pintar e desenhar"],
                ['E', "Fazer planos para um negócio próprio no futuro"],
                ['D', "Observar o céu com um telescópio"],
                ['J', "Ler revistas de viagens e turismo"],
                ['C', "Trabalhar como voluntário com menores carentes"],
                ['G', "Aprender a utilizar novos programas de computador"],
                ['B', "Ajudar a resolver conflitos entre amigos"],
                ['I', "Trabalhar em uma rádio comunitária"],
                ['F', "Participar da elaboração de projetos de prevenção ambiental"],
            ], [
                ['H', "Instalar e consertar aparelhos eletrônicos"],
                ['D', "Ler sobre os efeitos do crescimento da população sobre o ecossistema"],
                ['E', "Comentar notícias dos telejornais"],
                ['F', "Participar de uma banda ou grupode teatro da escola"],
                ['C', "Viajar e descobrir lugares pouco conhecidos"],
                ['G', "Entender mais sobre política"],
                ['B', "Estudar a fisiologia dos animais"],
                ['A', "Discutir com os pais o orçamento doméstico"],
                ['I', "Conhecer o funcionamento de um motor"],
                ['J', "Estudar terapias alternativas"],
            ],
        ], "O que você prefere?"]);

        this.data.push([[
            [
                ['H', "Software de desenho gráfico e tratamento de imagens"],
                ['G', "Máquinas e equipamentos industriais de alta tecnologia"],
                ['F', "Plantas e flores"],
                ['D', "Equipamentos de laboratório"],
                ['I', "Câmeras de tv e cinema"],
                ['J', "Equipamentos de academia e ginástica"],
                ['E', "Livros e revistas sobre empreendedorismo"],
                ['B', "Objetos e documentos históricos"],
                ['A', "Aparelhos de diagnóstico por imagem"],
                ['C', "Favelas"],
            ], [
                ['J', "Equipamentos esportivos"],
                ['G', "Satélites de comunicação"],
                ['F', "Pedras e minerais"],
                ['E', "Bolsa de valores"],
                ['D', "Computadores"],
                ['C', "Livros de Psicologia e autoajuda"],
                ['H', "Instrumentos musicais"],
                ['I', "Estúdio de televisão"],
                ['A', "O corpo humano"],
                ['B', "Museus e arquivos públicos"],
            ], [
                ['B', "Livros sobre legislação"],
                ['C', "Meninos de rua em situação de risco"],
                ['F', "Máquinas e equipamentos de reciclagem de materiais"],
                ['G', "Robôs e instrumentos de nanotecnologia"],
                ['J', "Estádios de futebol"],
                ['I', "Site de notícias"],
                ['H', "Tintas e pincéis"],
                ['D', "Microscópios"],
                ['E', "Softwares de administração de empresas"],
                ['A', "Instrumentos cirúrgicos"],
            ],
        ], "O que mais te chama atenção?"]);

        this.data.push([[
            [
                ['A', "Em um hospital"],
                ['F', "Em uma área de florestas"],
                ['G', "Em uma grande indústria"],
                ['D', "Em um laboratório"],
                ['B', "Em uma universidade"],
                ['I', "Em uma rádio ou canal de tv"],
                ['H', "Em um teatro"],
                ['C', "Em uma ONG de ajuda comunitária"],
                ['E', "Em uma empresa multinacional"],
                ['J', "Em um grande clube social e esportivo"],
            ], [
                ['I', "Em um jornal"],
                ['H', "Em uma escola de artes"],
                ['C', "Em meu próprio consultório"],
                ['D', "No departamento de pesquisas de uma grande empresa"],
                ['E', "Na minha própria empresa"],
                ['B', "Em uma escola"],
                ['A', "Em um consultório médico ou odontológico"],
                ['F', "No litoral"],
                ['G', "Em grandes canteiros de obras"],
                ['J', "Em um hotel"],
            ], [
                ['E', "Em uma empresa exportadora"],
                ['D', "Em uma empresa farmacêutica"],
                ['B', "Em uma instituição governamental"],
                ['F', "Em uma ONG e defesa ambiental"],
                ['G', "Em uma empresa de telecomunicações"],
                ['H', "Em uma empresa de arquitetura"],
                ['I', "Em uma empresa de publicidade"],
                ['J', "Em uma empresa de turismo"],
                ['A', "Em um laboratório de análises clínicas"],
                ['C', "Em uma clínica de saúde"],
            ],
        ], "Onde você gostaria de trabalhar?"]);

        this.data.push([[
            [
                ['A', "Ciências biomédicas"],
                ['D', "Matemática"],
                ['B', "Direito"],
                ['C', "Fonoaudiologia"],
                ['F', "Geologia"],
                ['E', "Ciências econômicas"],
                ['G', "Ciência da computação"],
                ['I', "Publicidade e propaganda"],
                ['H', "Artes cênicas"],
                ['J', "Hotelaria"],
            ], [
                ['J', "Turismo"],
                ['H', "Arquitetura e urbanismo"],
                ['I', "Cinema e vídeo"],
                ['A', "Medicina"],
                ['B', "Ciências sociais"],
                ['C', "Psicologia"],
                ['E', "Administração"],
                ['G', "Engenharia de Telecomunicações"],
                ['F', "Ecologia"],
                ['D', "Física"],
            ], [
                ['J', "Esporte e lazer"],
                ['I', "Design gráfico"],
                ['H', "Artes plásticas"],
                ['G', "Engenharia civil"],
                ['F', "Engenharia agrícola"],
                ['E', "Comércio exterior"],
                ['D', "Química"],
                ['C', "Pedagogia"],
                ['B', "História"],
                ['A', "Farmácia e bioquímica"],
            ],
        ], "Quais profissões mais lhe agradam?"]);
    }

    increase(letter) {
        this.result[letter] += 1;
    }

    decrese(letter) {
        this.result[letter] -= 1;
    }

    getResult() {
        var highestValue = [-1, ""];

        for (var key in this.result) {
            var value = this.result[key];
            if (value > highestValue[0]) {
                highestValue[0] = value;
                highestValue[1] = key;
            }
        }

        switch (highestValue[1]) {
            case 'A':
                return {
                    letter: 'A',
                    area: 'Ciências da saúde e biológicas', 
                    description: 'A atração principal é o cuidado com seres vivos e a cura de doenças. É preciso gostar de pesquisas, biologia e fisiologia, entre outras matérias.',
                    professions: 'Medicina, Ciências Biológicas, Ciências biomédicas, Farmácia, Bioquímica, Medicina veterinária, Obstetrícia, Odontologia, Zootecnia, Engenharia agrícola, Aquicultura, Oceanografia, Engenharia florestal, Microbiologia, e Imunologia.'
                }
            case 'B':
                return {
                    letter: 'B',
                    area: 'Ciências humanas e sociais', 
                    description: 'Ciências Humanas estão envolvidas diretamente com os homens, suas relações, história e pensamento. As sociais privilegiam a vida do homem em sociedade. O perfil dos que se sentem inclinados para essa área é a transformação do homem e da sociedade, o bem-estar e o progresso da coletividade.',
                    professions: 'Ciências sociais, Sociologia, Política, História, Geografia, Letras, Direito, Filosofia, Teologia, Pedagogia, Estudos literários, Linguística, Antropologia e Museologia.'
                }
            case 'C':
                return {
                    letter: 'C',
                    area: 'Comportamento e ajuda pessoal', 
                    description: 'Este é o campo das profissões cujo objetivo é de ajudarem as pessoas a viverem melhor. Seu foco é o indivíduo e a qualidade de vida.',
                    professions: 'Enfermagem, Nutrição, Fisioterapia, Fonoaudiologia, Musicoterapia, Gastronomia, Terapia Ocupacional, Psicopedagogia, Serviço Social, Psicologia, Pedagogia, Naturologia, Quiropraxia, Optometria, Acumpuntura, Educação e Educação Física.'
                }
            case 'D':
                return {
                    letter: 'D',
                    area: 'Ciências exatas', 
                    description: 'Gostar de matemática é o principal requisito das Ciências.',
                    professions: 'Matemática, Física, Química, Geofísica, Astronomia, Estatística e Meteorologia.'
                } 
            case 'E':
                return {
                    letter: 'E',
                    area: 'Negócios e administração', 
                    description: 'A área tem várias especializações, mas sempre centradas em administração e nas finanças das empresas. Exigem várias habilidades, desde cálculos e matemática até capacidade de comunicação e bom relacionamento pessoal, além de espírito empreendedor.',
                    professions: 'Administração, Ciências econômicas, Ciências Contábeis, Comércio exterior, Relações internacionais, Agronegócios, Administração rural e Secretariado executivo.'
                }           
            case 'F':
                return {
                    letter: 'F',
                    area: 'Ecologia', 
                    description: 'Trabalhar com a natureza e a preservação do meio ambiente é a principal função desta área. Vários cursos podem formar profissionais dedicados à ecologia, e o mercado de trabalho cresce a cada dia.',
                    professions: 'Engenharia agrícola, Geologia, Engenharia ambiental, Engenharia de pesca, Engenharia florestal e Biologia.'
                }
            case 'G':
                return {
                    letter: 'G',
                    area: 'Tecnologias e engenharia', 
                    description: 'O mundo da tecnologia é muito amplo e inclui especialidades das mais variadas. A intensa e rápida inovação tecnológica mantém o mercado de trabalho em constante expansão. É preciso gostar de ciências exatas, informática e ter pensamento lógico.',
                    professions: 'Ciências da computação, Engenharia civil, Mecânica, Naval, Industrial, Metalúrgica, Química, Da Computação, de Petróleo e Gás, Elétrica, Telecomunicações, de Alimento, Aeronáutica, Têxtil, Sanitária, Mecatrônica, Física e Cartografia.'
                }
            case 'H':
                return {
                    letter: 'H',
                    area: 'Artes', 
                    description: 'No mundo das artes, o requisito básico não é talento nato, mas criatividade, sensibilidade, senso estético, que são habilidades adquiridas pela experiência e formação cultural.',
                    professions: 'Arquitetura e Urbanismo, Artes plásticas, Artes do corpo, Dança, Design de Interiores Música e Moda.'
                } 
            case 'I':
                return {
                    letter: 'I',
                    area: 'Comunicações', 
                    description: 'O foco dessa área é a produção e transmissão de informações pelos vários meios de comunicação. Muitas das profissões são multidisciplinares e incluem arte, cultura e tecnologia.',
                    professions: 'Jornalismo, Audiovisual, Cinema, Rádio e TV, Multimídia, Fotografia, Design Gráfico, Desenho Industrial, Produção editorial, Produção cultural, Relações públicas, Publicidade e Propaganda e Marketing.'
                }
            case 'J':
                return {
                    letter: 'J',
                    area: 'Esporte e lazer', 
                    description: 'A área abrange esporte, lazer e turismo. A preocupação cada vez maior com a qualidade de vida e a transformação do esporte, lazer e turismo em empreendimentos altamente rentáveis valorizou profissões e criou novas especializações.',
                    professions: 'Esporte, Educação física, Gastronomia, Hotelaria e Turismo.'
                }
            default:
                return;
        }   
    }
}