export const scrollToOferta = () => {
    const ofertaSection = document.getElementById('oferta-section');
    ofertaSection?.scrollIntoView({ behavior: 'smooth' });
};
