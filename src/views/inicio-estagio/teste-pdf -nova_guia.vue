<template>
  <div>
    <h1>Gerar PDF com jsPDF e AutoTable</h1>
    <button @click="generatePDF">Gerar PDF</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  name: 'PdfGenerator',
  setup() {
    const generatePDF = () => {
      const doc = new jsPDF();

      // Adiciona a primeira página
      doc.setFontSize(22);
      doc.text('Dados dos Usuários - Página 1', 20, 20);

      const headers = [['Nome', 'Idade', 'Endereço', 'Cadastrado']];
      const data = Array.from({ length: 10 }, (_, i) => [
        `Nome ${i + 1}`,
        `${20 + (i % 30)}`,
        `Endereço ${i + 1}`,
        `01/${(i % 30) + 1}/2021`,
      ]);

      doc.autoTable({
        startY: 30,
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

      // Adiciona uma nova página
      doc.addPage();
      doc.setFontSize(22);
      doc.text('Dados dos Usuários - Página 2', 20, 20);

      // Adiciona uma nova tabela na segunda página
      const moreData = Array.from({ length: 10 }, (_, i) => [
        `Nome ${i + 11}`,
        `${30 + (i % 30)}`,
        `Endereço ${i + 11}`,
        `01/${((i + 10) % 30) + 1}/2021`,
      ]);

      doc.autoTable({
        startY: 30,
        head: headers,
        body: moreData,
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

      // Abre o PDF em uma nova aba
      const newWindow = window.open();
      newWindow.location.href = url;

      // Limpa o URL após 10 segundos para liberar recursos
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    };

    return {
      generatePDF,
    };
  },
};
</script>

<style scoped>
/* Adicione estilos conforme necessário */
</style>
