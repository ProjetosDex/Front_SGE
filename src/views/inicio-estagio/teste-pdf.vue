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

      // URL da imagem de fundo (substitua pela sua própria imagem)
      const backgroundImageUrl = 'src/assets/brasaooficial.png';

      // Carregar a imagem
      const backgroundImg = new Image();
      backgroundImg.src = backgroundImageUrl;
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
        doc.setGState(new doc.GState({ opacity: 0.3 }));
        doc.addImage(backgroundImg, 'PNG', xPos, yPos, imgWidth, imgHeight);
        doc.setGState(new doc.GState({ opacity: 1 }));

        doc.setFontSize(6);
        const cabecalho =
          'GOVERNO FEDERAL\nMINISTÉRIO DA EDUCAÇÃO\nINSTITUTO FEDERAL DO PARÁ - CAMPUS BELÉM\nDIRETORIA DE EXTENSÃO (DEX)/DIVISÃO DE INTEGRAÇÃO CAMPUS EMPRESAS DICAE';
        doc.text(cabecalho, 35, 6.5);

        const title = 'Termo de Compromisso de Estágio';
        doc.setFontSize(18);
        const xPosteste =
          (doc.internal.pageSize.getWidth() - doc.getTextWidth(title)) / 2;
        const yPosteste =
          (doc.internal.pageSize.getHeight() - doc.getTextWidth(title)) / 2;
        doc.setTextColor(0, 0, 0);
        doc.text(title, xPosteste, 25);

        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text('aoba.', 20, 60);
        doc.text('Bão', 20, 80);

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
