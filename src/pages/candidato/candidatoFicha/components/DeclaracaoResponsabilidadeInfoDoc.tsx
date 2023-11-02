import React from 'react';

type DeclaracaoResponsabilidadeInfoDocProps = {
  aceitarTermos: boolean;
  setAceitarTermos: React.Dispatch<React.SetStateAction<boolean>>;
};
//14. DECLARAÇÃO DE RESPONSABILIDADE PELAS INFORMAÇÕES E DOCUMENTOS
export default function DeclaracaoResponsabilidadeInfoDoc(
  props: DeclaracaoResponsabilidadeInfoDocProps
) {
  function formatarData(data: Date) {
    const meses = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];

    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();

    const textoFormatado = `${dia} de ${mes} de ${ano}`;
    return textoFormatado;
  }

  return (
    <React.Fragment>
      <div className="cabecalho-form">
        14. DECLARAÇÃO DE RESPONSABILIDADE PELAS INFORMAÇÕES E DOCUMENTOS
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span style={{ width: '80%' }}>
          Declaro, para efeito de estudo socioeconômico, que as informações
          prestadas nesse documento de 4 (quatro) páginas numeradas estão
          completas e são verdadeiras e assumo, por elas e pelas cópias dos
          documentos apresentados, inteira responsabilidade, ciente das
          penalidades previstas no Código Penal Brasileiro, Artigos 171 e 299.
          Autorizo a apresentação desses documentos aos órgãos públicos
          competentes, se necessário. Declaro ainda estar ciente de que os dados
          apresentados serão submetidos a uma análise técnica e, se convocado
          (a), deverei comparecer à Instituição, para entrevista com o (a)
          Assistente Social, em data e horário previamente agendados pela
          Instituição, apresentando os originais de todos os documentos anexados
          ao formulário e quaisquer outros que forem solicitados.
        </span>
        <span>Governador Valadares, {formatarData(new Date())}.</span>
      </div>
      <div className="container-btn-autorizar">
        <button
          type="button"
          className="btn-autorizar"
          onClick={() => props.setAceitarTermos(!props.aceitarTermos)}
        >
          Aceitar
        </button>
      </div>
    </React.Fragment>
  );
}
