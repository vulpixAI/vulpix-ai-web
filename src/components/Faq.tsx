import { default as FaqComponet } from "react-faq-component";

const data = {
    rows: [
        {
            title: "Como funciona a integração da Vulpix AI com as redes sociais?",
            content: "A Vulpix AI permite que você conecte sua loja virtual diretamente com plataformas como Instagram e Facebook. Após a integração, você pode automatizar e programar suas postagens e campanhas diretamente pela nossa plataforma."
        },
        {
            title: "Preciso de conhecimentos técnicos para usar a Vulpix AI?",
            content: "Não! Nossa plataforma é fácil de usar e foi projetada para empreendedores de todos os níveis. Com poucos cliques, você cria campanhas personalizadas e monitora seus resultados, sem complicações."
        },
        {
            title: "Posso ajustar minhas campanhas depois de criá-las?",
            content: "Sim, você pode editar e ajustar suas campanhas a qualquer momento, mesmo depois de programadas. A Vulpix AI oferece total flexibilidade para adaptar suas estratégias conforme as necessidades do seu negócio."
        },
        {
            title: "A Vulpix AI oferece suporte ao cliente?",
            content: "Sim, oferecemos suporte especializado para ajudar você em todas as etapas, desde a configuração inicial até o acompanhamento de suas campanhas. Estamos disponíveis via chat, e-mail ou telefone."
        },
        {
            title: "Quais formas de pagamento vocês aceitam?",
            content: "Aceitamos diversas formas de pagamento, incluindo cartões de crédito, débito e boletos bancários, para facilitar sua experiência ao escolher o plano ideal para o seu negócio."
        }
    ],
};

const styles = {
    bgColor: "transparent",
    titleTextColor: "#c3d1dc",
    rowTitleColor: "#c3d1dc",
    rowContentColor: "#c3d1dc",
    arrowColor: "#5d5aff"
};

export function Faq() {
    return (
        <FaqComponet
            data={data}
            styles={styles}
        />
    )
}