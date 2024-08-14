<template>
  <div>
    <h1>Gerar PDF com Imagem de Fundo</h1>
    <button @click="generatePDF">Gerar PDF</button>
    <iframe ref="pdfViewer" style="width: 100%; height: 850px"></iframe>
  </div>
</template>

<script>
import { jsPDF } from 'jspdf';

export default {
  name: 'PdfGenerator',
  methods: {
    generatePDF() {
  const doc = new jsPDF();

  const backgroundImageUrl = 'src/assets/brasaooficial.png';

  // Função adicionar o logo/texto ao lado + background brasão
  const addLogoWithTextAndBrasao = () => {
    const logoUrl = 'src/assets/logo_pdf_ifpa.png';
    const logo = new Image();
    logo.src = logoUrl;
    const logoWidth = 20;
    const logoHeigth = 10;

    // Adicionar o logo com opacidade alterada
    doc.setGState(new doc.GState({ opacity: 0.5 })); 
    doc.addImage(logo, 'PNG', 10, 5, logoWidth, logoHeigth);

    // Restaurar opacidade ao valor padrão
    doc.setGState(new doc.GState({ opacity: 1 }));

    // Adicionar o texto ao lado do logo
    doc.setFontSize(6);
    const cabecalho =
      'GOVERNO FEDERAL\nMINISTÉRIO DA EDUCAÇÃO\nINSTITUTO FEDERAL DO PARÁ - CAMPUS BELÉM\nDIRETORIA DE EXTENSÃO (DEX)/DIVISÃO DE INTEGRAÇÃO CAMPUS EMPRESAS DICAE';
    doc.text(cabecalho, 35, 6.5);
    // Adicionar o brasão no centro da página com opacidade
    const backgroundImg = new Image();
    backgroundImg.src = backgroundImageUrl;
    
    const imgWidth = 250;
    const imgHeight = 150;

    const xPos = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
    const yPos = (doc.internal.pageSize.getHeight() - imgHeight) / 2;

    doc.setGState(new doc.GState({ opacity: 0.1 })); 
    doc.addImage(backgroundImg, 'PNG', xPos, yPos, imgWidth, imgHeight);
    doc.setGState(new doc.GState({ opacity: 1 }));
  };

  // Carrega a imagem de fundo
  const backgroundImg = new Image();
  backgroundImg.src = backgroundImageUrl;
  doc.setFont('arial');
  backgroundImg.onload = () => {

    doc.setFont('arial', 'bold');
    const title = 'TERMO DE COMPROMISSO DE ESTÁGIO';
    const subtitle = '(INSTRUMENTO JURÍDICO PREVISTO NA LEI Nº 11.788/08)';
    doc.setFontSize(13);
    const xPosteste =
      (doc.internal.pageSize.getWidth() - doc.getTextWidth(title)) / 2;
    doc.text(title, xPosteste, 22);
    doc.setFont('arial', 'normal');
    doc.setFontSize(7);
    const posicaoXSubtitulo =
      (doc.internal.pageSize.getWidth() - doc.getTextWidth(subtitle)) / 2;
    doc.text(subtitle, posicaoXSubtitulo, 25);

    const lineStartX = 10;
    const lineEndX = doc.internal.pageSize.getWidth() - 10;
    const lineYPos = 23 + 3;
    doc.setLineWidth(0.2);
    doc.line(lineStartX, lineYPos, lineEndX, lineYPos);

        addLogoWithTextAndBrasao();
        // Conteúdo Página 1
        doc.setFontSize(11);
        const apresentacaoTCE = `Em ${''}, na cidade de Belém, as partes a seguir qualificadas, resolvem celebrar o Termo de Compromisso de Estágio ${'obrigatório'}, conforme a Lei nº 11.788/08 (LEI DE ESTÁGIO)`;
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 9.3;
        const maxWidth = pageWidth - margin * 2;

        const lines = doc.splitTextToSize(apresentacaoTCE, maxWidth);

        doc.text(lines, margin, 33); 
        doc.setFontSize(11);
        doc.setFont('arial', 'bold');
        const tituloIntituicao = 'INSTITUIÇÃO DE ENSINO';
        doc.text(tituloIntituicao, 9.3, 43); 
        doc.setFont('arial', 'normal');

        doc.setFontSize(10);

        // Razão Social
        doc.setFont('arial', 'bold');
        const razaoSocialTitle = 'Razão Social:';
        doc.text(razaoSocialTitle, 9.3, 47); 
        doc.setFont('arial', 'normal');
        const razaoSocial = 'INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO PARÁ';
        doc.text(razaoSocial, 9.3, 51);

        const totalWidth = pageWidth - 2 * margin;

        const ufWidth = totalWidth * 0.1;
        const remainingWidth = totalWidth;
        const sectionWidth = pageWidth / 4;

        const cnpjX = margin;
        const cidadeX = cnpjX + sectionWidth;
        const ufX = cidadeX + sectionWidth;
        const foneX = ufX + ufWidth;

        doc.setFont('arial', 'bold');
        const cnpjLabel = 'CNPJ:';
        doc.text(cnpjLabel, cnpjX, 55); 

        doc.setFont('arial', 'normal');
        const cnpj = '00.000.000/0000-00';
        doc.text(cnpj, cnpjX, 59); 

        doc.setFont('arial', 'bold');
        const cidadeLabel = 'Cidade:';
        doc.text(cidadeLabel, cidadeX, 55); 

        doc.setFont('arial', 'normal');
        const cidade = 'Belém';
        doc.text(cidade, cidadeX, 59);

        doc.setFont('arial', 'bold');
        const ufLabel = 'UF:';
        doc.text(ufLabel, ufX, 55);

        doc.setFont('arial', 'normal');
        const uf = 'PA';
        doc.text(uf, ufX, 59);

        doc.setFont('arial', 'bold');
        const foneLabel = 'Fone:';
        doc.text(foneLabel, foneX + 10, 55); 

        doc.setFont('arial', 'normal');
        const fone = '91 3201-1763/1712';
        doc.text(fone, foneX + 10, 59);

        doc.setFont('arial', 'bold');
        const enderecoLabel = 'Endereço:';
        doc.text(enderecoLabel, cnpjX, 63);

        doc.setFont('arial', 'normal');
        const endereco = 'Av. Almirante Barroso, 1155';
        doc.text(endereco, cnpjX, 67);

        doc.setFont('arial', 'bold');
        const bairroLabel = 'Bairro:';
        doc.text(bairroLabel, ufX, 63);

        doc.setFont('arial', 'normal');
        const bairro = 'Marco';
        doc.text(bairro, ufX, 67);

        doc.setFont('arial', 'bold');
        const cepLabel = 'CEP:';
        doc.text(cepLabel, foneX + 10, 63);

        doc.setFont('arial', 'normal');
        const cep = '66093-032';
        doc.text(cep, foneX + 10, 67);

        doc.setFont('arial', 'bold');
        const representanteLegalLabel = 'Representante legal:';
        doc.text(representanteLegalLabel, cnpjX, 71);

        doc.setFont('arial', 'normal');
        const representanteLegal = 'Jair Alcindo Lobo de Melo';
        doc.text(representanteLegal, cnpjX, 75);

        doc.setFont('arial', 'bold');
        const funcaoRepresentanteLabel = 'Função:';
        doc.text(funcaoRepresentanteLabel, foneX + 10, 71);

        doc.setFont('arial', 'normal');
        const funcaoRepresentante = 'Diretor de Extensão';
        doc.text(funcaoRepresentante, foneX + 10, 75);

        doc.setFont('arial', 'bold');
        const professorOrientadorLabel = 'Professor Orientador:';
        doc.text(professorOrientadorLabel, cnpjX, 79);

        doc.setFont('arial', 'normal');
        const professorOrientador = 'André Pachecão';
        doc.text(professorOrientador, cnpjX, 83);

        doc.setFont('arial', 'bold');
        const siapeLabel = 'SIAPE:';
        doc.text(siapeLabel, foneX + 10, 79); 

        doc.setFont('arial', 'normal');
        const siape = '12345678';
        doc.text(siape, foneX + 10, 83); 

        doc.setFontSize(11);
        doc.setFont('arial', 'bold');
        const tituloConcedente = 'CONCEDENTE';
        doc.text(tituloConcedente, 9.3, 90); 
        doc.setFont('arial', 'normal');

        doc.setFontSize(10);

        // Razão Social
        doc.setFont('arial', 'bold');
        const razaoSocialCedenteTitle = 'Razão Social:';
        doc.text(razaoSocialCedenteTitle, 9.3, 94); 

        doc.setFont('arial', 'normal');
        const razaoSocialCedente = 'Advocacia Geral da União';
        doc.text(razaoSocialCedente, 9.3, 98); 

        // CNPJ
        doc.setFont('arial', 'bold');
        const cnpjCedenteLabel = 'CNPJ:';
        doc.text(cnpjCedenteLabel, cnpjX, 103); 

        doc.setFont('arial', 'normal');
        const cnpjCedente = '00.000.000/0000-00';
        doc.text(cnpjCedente, cnpjX, 107); 

        // Cidade
        doc.setFont('arial', 'bold');
        const cidadeCedenteLabel = 'Cidade:';
        doc.text(cidadeCedenteLabel, cidadeX, 103); 

        doc.setFont('arial', 'normal');
        const cidadeCedente = 'Belém';
        doc.text(cidadeCedente, cidadeX, 107); 

        // UF
        doc.setFont('arial', 'bold');
        const ufCedenteLabel = 'UF:';
        doc.text(ufCedenteLabel, ufX, 103); 

        doc.setFont('arial', 'normal');
        const ufCedente = 'PA';
        doc.text(ufCedente, ufX, 107); 

        // Fone
        doc.setFont('arial', 'bold');
        const foneCedenteLabel = 'Fone:';
        doc.text(foneCedenteLabel, foneX + 10, 103); 

        doc.setFont('arial', 'normal');
        const foneCedente = '91 3201-1763/1712';
        doc.text(foneCedente, foneX + 10, 107);

        // Endereço
        doc.setFont('arial', 'bold');
        const enderecoCedenteLabel = 'Endereço:';
        doc.text(enderecoCedenteLabel, cnpjX, 111);

        doc.setFont('arial', 'normal');
        const enderecoCedente = 'Av. Almirante Barroso, 1155';
        doc.text(enderecoCedente, cnpjX, 115); 

        // Bairro
        doc.setFont('arial', 'bold');
        const bairroCedenteLabel = 'Bairro:';
        doc.text(bairroCedenteLabel, ufX, 111);

        doc.setFont('arial', 'normal');
        const bairroCedente = 'Marco';
        doc.text(bairroCedente, ufX, 115);

        // CEP
        doc.setFont('arial', 'bold');
        const cepCedenteLabel = 'Cep:';
        doc.text(cepCedenteLabel, foneX + 10, 111);

        doc.setFont('arial', 'normal');
        const cepCedente = '66093-032';
        doc.text(cepCedente, foneX + 10, 115);

        // Representante legal
        doc.setFont('arial', 'bold');
        const representanteLegalCedenteLabel = 'Representante legal:';
        doc.text(representanteLegalCedenteLabel, cnpjX, 119); 

        doc.setFont('arial', 'normal');
        const representanteLegalCedente = 'Jair Alcindo Lobo de Melo';
        doc.text(representanteLegalCedente, cnpjX, 123); 

        // Cargo
        doc.setFont('arial', 'bold');
        const funcaoRepresentanteCedenteLabel = 'Cargo:';
        doc.text(funcaoRepresentanteCedenteLabel, foneX + 10, 119);

        doc.setFont('arial', 'normal');
        const funcaoRepresentanteCedente = 'Diretor';
        doc.text(funcaoRepresentanteCedente, foneX + 10, 123);

        // Supervisor
        doc.setFont('arial', 'bold');
        const supervisorLabel = 'Supervisor:';
        doc.text(supervisorLabel, cnpjX, 127);

        doc.setFont('arial', 'normal');
        const supervisor = 'Jalim Rabei mohammed';
        doc.text(supervisor, cnpjX, 131);

        // Cargo do Supervisor
        doc.setFont('arial', 'bold');
        const cargoSupervisorLabel = 'Cargo:';
        doc.text(cargoSupervisorLabel, foneX + 10, 127);

        doc.setFont('arial', 'normal');
        const cargoSupervisor = 'Líder de TI';
        doc.text(cargoSupervisor, foneX + 10, 131);

        doc.setFontSize(12);
        doc.setFont('arial', 'bold');
        const tituloEstagiario = 'ESTAGIÁRIO';
        doc.text(tituloEstagiario, 9.3, 137);
        doc.setFont('arial', 'normal');

        doc.setFontSize(10);

        // Nome
        doc.setFont('arial', 'bold');
        const nomeAlunoLabel = 'Nome:';
        doc.text(nomeAlunoLabel, cnpjX, 141);

        doc.setFont('arial', 'normal');
        const nomeAluno = 'Jair Alcindo Lobo de Melo';
        doc.text(nomeAluno, cnpjX, 145);

        // Matrícula
        doc.setFont('arial', 'bold');
        const matriculaAlunoLabel = 'Matrícula:';
        doc.text(matriculaAlunoLabel, foneX + 10, 141);

        doc.setFont('arial', 'normal');
        const matriculaAluno = '20211011001';
        doc.text(matriculaAluno, foneX + 10, 145);

        // Curso
        doc.setFont('arial', 'bold');
        const cursoLabel = 'Curso:';
        doc.text(cursoLabel, cnpjX, 149);

        doc.setFont('arial', 'normal');
        const curso = 'Análise e Desenvolvimento de Sistemas';
        doc.text(curso, cnpjX, 153);

        // Email
        doc.setFont('arial', 'bold');
        const emailLabel = 'Email:';
        doc.text(emailLabel, foneX + 10, 149); 

        doc.setFont('arial', 'normal');
        const email = 'jair.melo@ifpa.edu.br';
        doc.text(email, foneX + 10, 153); 

        // CPF
        doc.setFont('arial', 'bold');
        const cpfEstagiarioLabel = 'CPF:';
        doc.text(cpfEstagiarioLabel, cnpjX, 157); 

        doc.setFont('arial', 'normal');
        const cpfEstagiario = '123.456.789-00';
        doc.text(cpfEstagiario, cnpjX, 161);

        // RG
        doc.setFont('arial', 'bold');
        const rgLabel = 'RG:';
        doc.text(rgLabel, cidadeX, 157);

        doc.setFont('arial', 'normal');
        const rg = '123456789';
        doc.text(rg, cidadeX, 161);

        // Data de Nascimento
        doc.setFont('arial', 'bold');
        const dataNascimentoLabel = 'Data Nasc:';
        doc.text(dataNascimentoLabel, ufX, 157);

        doc.setFont('arial', 'normal');
        const dataNascimento = '18/04/2001';
        doc.text(dataNascimento, ufX, 161); 

        // Celular
        doc.setFont('arial', 'bold');
        const celularLabel = 'Celular:';
        doc.text(celularLabel, foneX + 10, 157);

        doc.setFont('arial', 'normal');
        const celular = '91 98455-7644';
        doc.text(celular, foneX + 10, 161); 

        // Endereço
        doc.setFont('arial', 'bold');
        const enderecoEstagiarioLabel = 'Endereço:';
        doc.text(enderecoEstagiarioLabel, cnpjX, 165); 

        doc.setFont('arial', 'normal');
        const enderecoEstagiario = 'Rua do Estagiário, 123';
        doc.text(enderecoEstagiario, cnpjX, 169); 

        // CEP
        doc.setFont('arial', 'bold');
        const cepEstagiarioLabel = 'CEP:';
        doc.text(cepEstagiarioLabel, foneX + 10, 165); 

        doc.setFont('arial', 'normal');
        const cepEstagiario = '66093-032';
        doc.text(cepEstagiario, foneX + 10, 169); 

        const sectionWidthEstag = pageWidth / 3;

        // Bairro Estagiário
        doc.setFont('arial', 'bold');
        const bairroEstagLabel = 'Bairro:';
        doc.text(bairroEstagLabel, cnpjX, 173); 

        doc.setFont('arial', 'normal');
        const bairroEstag = 'Curuçambá';
        doc.text(bairroEstag, cnpjX, 177); 

        doc.setFont('arial', 'bold');
        const cidadeEstagLabel = 'Cidade:';
        const cidadeEstagX = cnpjX + sectionWidthEstag;
        doc.text(cidadeEstagLabel, cidadeEstagX, 173);

        doc.setFont('arial', 'normal');
        const cidadeEstag = 'Ananindeua';
        doc.text(cidadeEstag, cidadeEstagX, 177);7

        doc.setFont('arial', 'bold');
        const ufEstagLabel = 'UF:';
        const ufEstagX = foneX + 10;
        doc.text(ufEstagLabel, ufEstagX, 173); 

        doc.setFont('arial', 'normal');
        const ufEstag = 'PA';
        doc.text(ufEstag, ufEstagX, 177); 

        // Condições do Estágio
        doc.setFontSize(12);
        doc.setFont('arial', 'bold');
        const tituloCondicoes = 'CONDIÇÕES DO ESTÁGIO:';
        doc.text(tituloCondicoes, cnpjX, 183); 

        doc.setFontSize(10);

        // Período
        doc.setFont('arial', 'bold');
        const periodoLabel = 'Período (dia/mês/ano):';
        doc.text(periodoLabel, cnpjX, 187); 

        doc.setFont('arial', 'normal');
        const periodo = '01/09/2024 a 01/03/2025';
        doc.text(periodo, cnpjX, 191);

        // Horário
        doc.setFont('arial', 'bold');
        const horarioLabel = 'Horário (hora e minuto):';
        const horarioX = cidadeEstagX;
        doc.text(horarioLabel, horarioX, 187);

        doc.setFont('arial', 'normal');
        const horario = '08:00 a 12:00';
        doc.text(horario, horarioX, 191); 

        // Jornada semanal
        doc.setFont('arial', 'bold');
        const jornadaLabel = 'Jornada semanal (hora):';
        const jornadaX = ufEstagX;
        doc.text(jornadaLabel, jornadaX, 187);

        doc.setFont('arial', 'normal');
        const jornada = '20 horas';
        doc.text(jornada, jornadaX, 191); 

        // Bolsa auxílio
        doc.setFont('arial', 'bold');
        const bolsaLabel = 'Bolsa auxílio (R$):';
        doc.text(bolsaLabel, cnpjX, 195);

        doc.setFont('arial', 'normal');
        const bolsa = '800,00 (oitocentos reais)';
        doc.text(bolsa, cnpjX, 199); 

        // Auxílio Transporte
        doc.setFont('arial', 'bold');
        const transporteLabel = 'Auxílio Transporte (R$):';
        doc.text(transporteLabel, jornadaX, 195); 

        doc.setFont('arial', 'normal');
        const transporte = '200,00 (duzentos reais)';
        doc.text(transporte, jornadaX, 199);

        // Plano de Atividades de Estágio
        doc.setFont('arial', 'bold');
        const planoAtividadesLabel = 'Plano de Atividade de Estágio:';
        doc.text(planoAtividadesLabel, cnpjX, 203); 

        doc.setFont('arial', 'normal');
        const atividades = [
            '01. Desenvolver sistemas web utilizando JavaScript e frameworks modernos.',
            '02. Auxiliar na manutenção de sistemas já existentes, corrigindo bugs e implementando novas funcionalidades.',
            '03. Participar de reuniões de planejamento e discussão de projetos com a equipe.',
            '04. Realizar testes de qualidade nos sistemas desenvolvidos.',
            '05. Documentar o código e as soluções desenvolvidas para facilitar futuras manutenções.'
        ];

        atividades.forEach((atividade, index) => {
            doc.text(atividade, cnpjX, 207 + (index * 5));
        });

        // Cláusulas
        doc.setFont('arial', 'bold');
        const tituloClausulas = 'Celebram entre si este TERMO DE COMPROMISSO DE ESTÁGIO, convencionando as cláusulas seguintes:';
        doc.text(tituloClausulas, cnpjX, 233); 

        doc.setFont('arial', 'bold');
        const clausula1Titulo = 'Cláusula 1ª –';
        doc.text(clausula1Titulo, cnpjX, 237); 
        doc.setFont('arial', 'normal');
        const clausula1Texto = 'Este instrumento tem por objetivo formalizar as condições para realização de ESTÁGIO DE ESTUDANTE e particularizar a relação jurídica especial existente entre o ESTAGIÁRIO, a CONCEDENTE e o IFPA caracterizando a não vinculação empregatícia, nos termos da legislação vigente, bem como, certificamos que as atividades a serem realizadas pelo aluno estão previstas na proposta pedagógica do Curso como forma de contextualização do currículo, em termos de educação para o trabalho e a cidadania.';
        doc.text(doc.splitTextToSize(clausula1Texto, maxWidth), cnpjX, 241); 

        doc.setFont('arial', 'bold');
        const clausula2Titulo = 'Cláusula 2ª –';
        doc.text(clausula2Titulo, cnpjX, 257); 
        doc.setFont('arial', 'normal');
        const clausula2Texto = 'O ESTÁGIO DE ESTUDANTES, obrigatório ou não obrigatório, está em conformidade com o projeto pedagógico do curso, nos termos da Lei nº 11.788/08.';
        doc.text(doc.splitTextToSize(clausula2Texto, maxWidth), cnpjX, 261);

        doc.setFont('arial', 'bold');
        const clausula3Titulo = 'Cláusula 3ª – Cabe ao IFPA:';
        doc.text(clausula3Titulo, cnpjX, 269);

        doc.setFont('arial', 'normal');
        const clausula3Texto = [
            'a) Aprovar o Estágio de que trata o presente instrumento, considerando as condições de sua adequação à proposta pedagógica do curso, à etapa e modalidade de formação escolar do Estagiário e ao horário e calendário escolar;',
            'b) Aprovar o plano de atividades do Estágio que consubstancie as condições/requisitos suficientes à exigência legal de adequação à etapa e modalidade de formação escolar do Estagiário;',
            'c) Avaliar as instalações da Concedente através de instrumentos próprios;'
        ];

        clausula3Texto.forEach((item, index) => {
            const lines = doc.splitTextToSize(item, maxWidth);
            lines.forEach((line, lineIndex) => {
                doc.text(line, cnpjX, 273 + (index * 8) + (lineIndex * 4)); 
            });
        });

        //Adicionar nova Página
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.addPage();

        // Conteúdo Página 2

        addLogoWithTextAndBrasao();

        //Função para ajustar espaçamento e posição dos paragráfos
        function addClausula(doc, title, textoArray, xPos, startY, maxWidth) {
          doc.setFont('arial', 'bold');
          doc.text(title, xPos, startY);

          doc.setFont('arial', 'normal');
          let yPos = startY + 4; // Espaço entre o título e o primeiro item
          const lineSpacing = 4; // Espaçamento entre as linhas
          const paragraphSpacing = 1; // Espaçamento entre os parágrafos

          textoArray.forEach((item) => {
              const lines = doc.splitTextToSize(item, maxWidth);
              lines.forEach((line, lineIndex) => {
                  doc.text(line, xPos, yPos + (lineIndex * lineSpacing));
              });
              yPos += lines.length * lineSpacing + paragraphSpacing; // Ajuste a posição vertical com base no número de linhas
          });

          return yPos; // Retorna a posição vertical final para continuar com o próximo conteúdo
        }

        doc.setFontSize(10);
        const clausula3TextoPag2 = [
            'd) Indicar professor orientador, da área a ser desenvolvida no Estágio, como responsável pelo acompanhamento e avaliação do relatório das atividades do Estagiário.',
            'e) Comunicar à parte concedente do Estágio, no início do período letivo, as datas de realização de avaliações escolares ou acadêmica.'
        ];
        let currentY = 22; // Posição inicial na página
        currentY = addClausula(doc, 'Cláusula 3ª – Cabe ao IFPA:', clausula3TextoPag2, cnpjX, currentY, maxWidth);

        // Adiciona cláusula 4
        const clausula4Texto = [
          'a) Zelar pelo cumprimento do presente Termo de Compromisso;',
          'b) Proporcionar ao Estagiário condições de exercícios de atividades práticas compatíveis com o Plano de atividades de estágio;',
          'c) Designar um supervisor que seja funcionário de seu quadro de pessoal, com formação ou experiência profissional na área de conhecimento desenvolvida no curso do Estagiário, para orientá-lo e acompanhá-lo no desenvolvimento das atividades do estágio;',
          'd) Solicitar ao Estagiário, a qualquer tempo, documentos comprobatórios da regularidade da situação escola, uma vez que trancamento de matrícula, abandono, conclusão de curso ou transferência de Instituição de Ensino constituem motivos de imediata rescisão;',
          'e) Conceder bolsa-estágio e auxílio transporte no caso de estágio não obrigatório, sendo que o pagamento destes valores deverá ser feito diretamente ao estagiário;',
          'f) No caso do estágio obrigatório, se houver a concessão da bolsa-auxílio e do auxílio transporte, ou de um dos dois, o pagamento deverá ser feito diretamente ao estagiário;',
          'g) Assegurar ao Estagiário recesso nos termos da Lei 11.788/08, bem como, remunerá-lo conforme haja pagamento de bolsa auxílio;',
          'h) Reduzir as jornadas de estágio nos períodos de avaliação, previamente informados pelo Estagiário;',
          'i) Encaminhar para o IFPA o relatório individual de atividades, assinado pelo supervisor, com periodicidade mínima de 06 meses, com vista obrigatória do Estagiário;',
          'j) Entregar, por ocasião de desligamento, termo de realização do estágio com indicação resumida das atividades desenvolvidas, dos períodos e da avaliação de desempenho;',
          'k) Manter em arquivo e à disposição da fiscalização os documentos firmados que comprovem a relação de estágio;',
          'l) Informar ao IFPA (DICAE/DEX) a rescisão antecipada deste instrumento, para as devidas providências administrativas que se fizerem necessárias;',
          'm) Permitir o início das atividades de estágio apenas após o recebimento das 04 vias deste instrumento assinada pelas três partes signatárias.'
        ];
        currentY = addClausula(doc, 'Cláusula 4ª – Cabe à concedente:', clausula4Texto, cnpjX, currentY + 1, maxWidth);

        // Adiciona cláusula 5
        const clausula5Texto = [
          'a) Cumprir, com todo empenho e interesse, toda programação estabelecida para seu Estágio;',
          'b) Observar, obedecer e cumprir as normas internas de Concedente, preservando o sigilo e a confidencialidade das informações que tiver acesso;',
          'c) Apresentar documentos comprobatórios da regularidade da sua situação escolar, sempre que solicitado pela Concedente;',
          'd) Manter rigorosamente atualizados seus dados cadastrais e escolares, junto à Concedente;',
          'e) Informar de imediato, qualquer alteração na sua situação escolar, tais como: trancamento de matrícula, abandono, conclusão de curso ou transferência de Instituição de Ensino;',
          'f) Entregar, obrigatoriamente, ao IFPA e à Concedente uma via do presente instrumento, devidamente assinada pelas partes;',
          'g) Informar previamente à Concedente os períodos de avaliação no IFPA, para fins de redução da jornada de estágio;',
          'h) Preencher os relatórios de estágio a fim de subsidiar o IFPA com informações sobre seu estágio.'
        ];
        currentY = addClausula(doc, 'Cláusula 5ª – Cabe ao Estagiário:', clausula5Texto, cnpjX, currentY + 1, maxWidth);

        // Adiciona cláusula 6
        const clausula6Texto = [
          'O presente instrumento e o Plano de Atividades de Estágio serão alterados ou prorrogados através de Termos Aditivos.',
          'Parágrafo Primeiro - O presente Termo de Compromisso de Estágio pode ser reincidido ou denunciado, a qualquer tempo, mediante comunicação escrita, pelo IFPA, pela Concedente ou pelo Estagiário, sendo a vontade deste último, a comunicação para rescisão deverá ocorrer pelos menos 15 (quinze) dias antes do desligamento efetivo.',
          'Parágrafo Segundo - O Não cumprimento de quaisquer cláusulas do presente Termo de Compromisso de Estágio constitui motivo de imediata rescisão.'
        ];
        currentY = addClausula(doc, 'Cláusula 6ª – Alterações e Rescisão:', clausula6Texto, cnpjX, currentY + 1, maxWidth);

        // Adiciona cláusula 7
        const clausula7Texto = [
          'O Estagiário durante a vigência do presente Termo de Compromisso de Estágio estará segurado contra acidentes pessoais conforme apólice nº 666999, da seguradora Teste de Seguradora.'
        ];
        currentY = addClausula(doc, 'Cláusula 7ª – Seguro:', clausula7Texto, cnpjX, currentY + 1, maxWidth);

        // Texto final em negrito
        doc.setFontSize(11);
        doc.setFont('arial', 'bold');
        const textoFinal = 'E, por estarem de inteiro e comum acordo com o Plano de Atividades de Estágio e com as demais condições estabelecidas neste Termo de Compromisso de Estágio, as partes assinam em 04 vias de igual teor.';
        doc.text(doc.splitTextToSize(textoFinal, maxWidth), cnpjX, currentY + 2);

        // Configurações Assinatura
        const pageWidthAssinatura = doc.internal.pageSize.getWidth();
        const marginX = 10;
        const contentWidthAssinatura = pageWidthAssinatura - 2 * marginX;

        // Posição Y para as assinaturas (ajuste conforme necessário)
        const yPosition = doc.internal.pageSize.getHeight() - 27;

        // Largura e posição das linhas
        const lineLength = 50;
        const spacingBetweenSignatures = 20; // Ajuste conforme necessário para espaçar as assinaturas corretamente

        const firstLineX = marginX; // Alinhar com a margem esquerda
        const secondLineX = firstLineX + lineLength + spacingBetweenSignatures; // Alinhar a um terço da página, com espaçamento
        const thirdLineX = secondLineX + lineLength + spacingBetweenSignatures; // Alinhar a dois terços da página

        // Desenhar as linhas para assinaturas
        doc.setLineWidth(0.2);
        doc.line(firstLineX, yPosition, firstLineX + lineLength, yPosition); // Linha para ESTAGIÁRIO
        doc.line(secondLineX, yPosition, secondLineX + lineLength, yPosition); // Linha para SUPERVISOR
        doc.line(thirdLineX, yPosition, thirdLineX + lineLength, yPosition); // Linha para COORDENADOR

        // Adicionar os textos abaixo das linhas
        doc.setFont('arial', 'normal');
        doc.setFontSize(8);

        doc.text('ESTAGIÁRIO', firstLineX + lineLength / 2, yPosition + 5, { align: 'center' });
        doc.text('SUPERVISOR (com CARIMBO)', secondLineX + lineLength / 2, yPosition + 5, { align: 'center' });
        doc.text('IFPA – COORDENADOR DO CURSO', thirdLineX + lineLength / 2, yPosition + 5, { align: 'center' });



        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        this.$refs.pdfViewer.src = pdfUrl;
      };

      backgroundImg.onerror = (error) => {
        console.error('Erro ao carregar a imagem:', error);
      };
    },
  },
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
