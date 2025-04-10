<template>
  <div>
    <h1>Gerar PDF com Bordas Arredondadas</h1>
    <button @click="generatePDF">Gerar PDF</button>
    <div v-if="pdfUrl" class="pdf-container">
      <iframe
        :src="pdfUrl"
        width="100%"
        height="600px"
        style="border: none"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import jsPDF from 'jspdf';

export default {
  name: 'PdfWithRoundedCorners',
  setup() {
    const pdfUrl = ref(null);

    const generatePDF = () => {
      const doc = new jsPDF();

      // Adiciona um título com estilo
      doc.setFontSize(22);
      doc.setTextColor(0, 51, 102); // Azul escuro
      doc.text('Relatório com Bordas Arredondadas', 20, 20);

      // Adiciona uma caixa com bordas arredondadas
      const x = 20;
      const y = 30;
      const width = 180;
      const height = 50;
      const radius = 10;

      doc.setFillColor(200, 220, 255); // Cor de fundo da caixa
      doc.roundedRect(x, y, width, height, radius, radius, 'F'); // Desenha o retângulo arredondado
      doc.setTextColor(0, 0, 0); // Cor do texto
      doc.text('Texto dentro da caixa com bordas arredondadas', x + 10, y + 25);

      // Adiciona uma tabela
      const headers = [['Nome', 'Idade', 'Endereço', 'Cadastrado']];
      const data = Array.from({ length: 5 }, (_, i) => [
        `Nome ${i + 1}`,
        `${20 + (i % 30)}`,
        `Endereço ${i + 1}`,
        `01/${(i % 30) + 1}/2021`,
      ]);

      // Define o estilo da tabela
      doc.autoTable({
        startY: 100,
        head: headers,
        body: data,
        headStyles: {
          fillColor: [0, 51, 102], // Azul escuro
          textColor: [255, 255, 255], // Texto branco
        },
        styles: {
          fontSize: 12,
          cellPadding: 5,
          overflow: 'linebreak',
        },
        margin: { top: 30 },
      });

      // Gera um blob do PDF
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);

      // Atualiza a URL para o PDF para exibição
      pdfUrl.value = url;

      // Limpa a URL após 10 segundos para liberar recursos
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    };

    return {
      pdfUrl,
      generatePDF,
    };
  },
};
</script>

<style scoped>
.pdf-container {
  margin-top: 20px;
}
</style>
