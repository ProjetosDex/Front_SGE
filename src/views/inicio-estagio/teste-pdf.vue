<template>
  <div>
    <h1>Gerar PDF com Imagem de Fundo</h1>
    <button @click="generatePDF">Gerar PDF</button>
    <iframe ref="pdfViewer" style="width: 100%; height: 500px"></iframe>
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

      // Carregar a imagem
      const backgroundImg = new Image();
      backgroundImg.src = backgroundImageUrl;
      doc.setFont('arial');
      backgroundImg.onload = () => {
        const logoUrl = 'src/assets/logo_pdf_ifpa.png';
        const logo = new Image();
        logo.src = logoUrl;
        const logoWidth = 20;
        const logoHeigth = 10;

        const imgWidth = 250;
        const imgHeight = 150;

        const xPos = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
        const yPos = (doc.internal.pageSize.getHeight() - imgHeight) / 2;

        // Adicionar a imagem ao PDF com transparência
        doc.addImage(logo, 'PNG', 10, 5, logoWidth, logoHeigth);
        doc.setGState(new doc.GState({ opacity: 0.1 }));
        doc.addImage(backgroundImg, 'PNG', xPos, yPos, imgWidth, imgHeight);
        doc.setGState(new doc.GState({ opacity: 1 }));

        doc.setFontSize(6);
        const cabecalho =
          'GOVERNO FEDERAL\nMINISTÉRIO DA EDUCAÇÃO\nINSTITUTO FEDERAL DO PARÁ - CAMPUS BELÉM\nDIRETORIA DE EXTENSÃO (DEX)/DIVISÃO DE INTEGRAÇÃO CAMPUS EMPRESAS DICAE';
        doc.text(cabecalho, 35, 6.5);

        doc.setFont('arial', 'bold');
        const title = 'Termo de Compromisso de Estágio';
        const subtitle = '(INSTRUMENTO JURÍDICO PREVISTO NA LEI Nº 11.788/08)';
        doc.setFontSize(18);
        const xPosteste =
          (doc.internal.pageSize.getWidth() - doc.getTextWidth(title)) / 2;
        const yPosteste =
          (doc.internal.pageSize.getHeight() - doc.getTextWidth(title)) / 2;
        doc.setTextColor(0, 0, 0);
        doc.text(title, xPosteste, 25);
        doc.setFont('arial', 'normal');
        doc.setFontSize(8);
        const posicaoXSubtitulo =
          (doc.internal.pageSize.getWidth() - doc.getTextWidth(subtitle)) / 2;
        doc.text(subtitle, posicaoXSubtitulo, 32);

        const lineStartX = 10;
        const lineEndX = doc.internal.pageSize.getWidth() - 10;
        const lineYPos = 32 + 3;
        doc.setLineWidth(0.2);
        doc.line(lineStartX, lineYPos, lineEndX, lineYPos);

        //conteudo
        doc.setFontSize(12);
        const apresentacaoTCE = `Em ${''}, na cidade de Belém, as partes a seguir qualificadas, resolvem celebrar o Termo de Compromisso de Estágio ${'obrigatório'}, conforme a Lei nº 11.788/08 (LEI DE ESTÁGIO)`;

        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 9.3;
        const maxWidth = pageWidth - margin * 2;

        const lines = doc.splitTextToSize(apresentacaoTCE, maxWidth);

        doc.text(lines, margin, 40);

        doc.setFontSize(12);
        doc.setFont('arial', 'bold');
        const tituloIntituicao = 'INSTITUIÇÃO DE ENSINO';
        doc.text(tituloIntituicao, 9.3, 53);
        doc.setFont('arial', 'normal');

        doc.setFontSize(12);
        const razaoSocialTitle = 'Razão Social:';
        const razaoSocial = `${'Instituto federal de educação, ciência e tecnologia do pará'}`;
        doc.text(razaoSocialTitle, 9.3, 58);
        doc.text(razaoSocial, 9.3, 62);

        const totalWidth = pageWidth - 2 * margin;

        // Defina as larguras para cada seção
        const ufWidth = totalWidth * 0.1; // 10% da largura total para UF
        const remainingWidth = totalWidth;
        const sectionWidth = pageWidth / 4; // Divida o restante em 3 partes iguais

        // Calcula as posições X para cada seção
        const cnpjX = margin;
        const cidadeX = cnpjX + sectionWidth;
        const ufX = cidadeX + sectionWidth;
        const foneX = ufX + ufWidth;

        // Adicione os textos ao PDF
        const cnpjLabel = 'CNPJ:';
        const cnpj = '00.000.000/0000-00';
        doc.text(cnpjLabel, cnpjX, 68);
        doc.text(cnpj, cnpjX, 72.5);

        const cidadeLabel = 'Cidade:';
        const cidade = 'Belém';
        doc.text(cidadeLabel, cidadeX, 68);
        doc.text(cidade, cidadeX, 72.5);

        const ufLabel = 'UF:';
        const uf = 'PA';
        doc.text(ufLabel, ufX, 68);
        doc.text(uf, ufX, 72.5);

        const foneLabel = 'Fone:';
        const fone = '91 3201-1763/1712';
        doc.text(foneLabel, foneX + 10, 68);
        doc.text(fone, foneX + 10, 72.5);

        const enderecoLabel = 'Endereço:';
        const endereco = 'Av. Almirante Barroso, 1155';
        doc.text(enderecoLabel, cnpjX, 82);
        doc.text(endereco, cnpjX, 87.5);

        const bairroLabel = 'Bairro:';
        const bairro = 'Marco';
        doc.text(bairroLabel, ufX, 82);
        doc.text(bairro, ufX, 87.5);

        const cepLabel = 'Cep:';
        const cep = '66093-032';
        doc.text(cepLabel, foneX + 10, 82);
        doc.text(cep, foneX + 10, 87.5);

        const representanteLegalLabel = 'Representante legal:';
        const representanteLegal = 'Jair Alcindo Lobo de Melo';
        doc.text(representanteLegalLabel, cnpjX, 95);
        doc.text(representanteLegal, cnpjX, 100);

        const funcaoRepresentanteLabel = 'Função:';
        const funcaoRepresentante = 'Diretor de Extensão';
        doc.text(funcaoRepresentanteLabel, foneX + 10, 95);
        doc.text(funcaoRepresentante, foneX + 10, 100);

        const professorOrientadorLabel = 'Professor Orientador:';
        const professorOrientador = 'André pachecão';
        doc.text(professorOrientadorLabel, cnpjX, 110);
        doc.text(professorOrientador, cnpjX, 115);

        const siapeLabel = 'SIAPE:';
        const siape = '12345678';
        doc.text(siapeLabel, foneX + 10, 110);
        doc.text(siape, foneX + 10, 115);

        doc.setFontSize(12);
        doc.setFont('arial', 'bold');
        const tituloConcedente = 'CONCEDENTE';
        doc.text(tituloConcedente, 9.3, 125);
        doc.setFont('arial', 'normal');

        doc.setFontSize(12);
        const razaoSocialCedenteTitle = 'Razão Social:';
        const razaoSocialCedente = `${'Advocacia Geral da União'}`;
        doc.text(razaoSocialCedenteTitle, 9.3, 132);
        doc.text(razaoSocialCedente, 9.3, 137);

        const cnpjCedenteLabel = 'CNPJ:';
        const cnpjCedente = '00.000.000/0000-00';
        doc.text(cnpjCedenteLabel, cnpjX, 145);
        doc.text(cnpjCedente, cnpjX, 149);

        const cidadeCedenteLabel = 'Cidade:';
        const cidadeCedente = 'Belém';
        doc.text(cidadeCedenteLabel, cidadeX, 145);
        doc.text(cidadeCedente, cidadeX, 149);

        const ufCedenteLabel = 'UF:';
        const ufCedente = 'PA';
        doc.text(ufCedenteLabel, ufX, 145);
        doc.text(ufCedente, ufX, 149);

        const foneCedenteLabel = 'Fone:';
        const foneCedente = '91 3201-1763/1712';
        doc.text(foneCedenteLabel, foneX + 10, 145);
        doc.text(foneCedente, foneX + 10, 149);

        const enderecoCedenteLabel = 'Endereço:';
        const enderecoCedente = 'Av. Almirante Barroso, 1155';
        doc.text(enderecoCedenteLabel, cnpjX, 155);
        doc.text(enderecoCedente, cnpjX, 160);

        const bairroCedenteLabel = 'Bairro:';
        const bairroCedente = 'Marco';
        doc.text(bairroCedenteLabel, ufX, 155);
        doc.text(bairroCedente, ufX, 160);

        const cepCedenteLabel = 'Cep:';
        const cepCedente = '66093-032';
        doc.text(cepCedenteLabel, foneX + 10, 155);
        doc.text(cepCedente, foneX + 10, 160);

        const representanteLegalCedenteLabel = 'Representante legal:';
        const representanteLegalCedente = 'Jair Alcindo Lobo de Melo';
        doc.text(representanteLegalCedenteLabel, cnpjX, 167);
        doc.text(representanteLegalCedente, cnpjX, 172);

        const funcaoRepresentanteCedenteLabel = 'Cargo:';
        const funcaoRepresentanteCedente = 'Diretor de Extensão';
        doc.text(funcaoRepresentanteCedenteLabel, foneX + 10, 167);
        doc.text(funcaoRepresentanteCedente, foneX + 10, 172);

        const supervisorLabel = 'Representante legal:';
        const supervisor = 'Jair Alcindo Lobo de Melo';
        doc.text(supervisorLabel, cnpjX, 179);
        doc.text(supervisor, cnpjX, 184);

        const cargoSupervisorLabel = 'Cargo:';
        const cargoSupervisor = 'Diretor de Extensão';
        doc.text(cargoSupervisorLabel, foneX + 10, 179);
        doc.text(cargoSupervisor, foneX + 10, 184);

        doc.setFontSize(12);
        doc.setFont('arial', 'bold');
        const tituloEstagiario = 'ESTAGIÁRIO';
        doc.text(tituloEstagiario, 9.3, 192);
        doc.setFont('arial', 'normal');

        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.addPage();

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
