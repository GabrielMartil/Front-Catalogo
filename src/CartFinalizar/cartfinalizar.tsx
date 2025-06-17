// CartFinalizar.tsx
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import "./cartfinalizar.css"

interface CartFinalizarProps {
  produto: {
    name: string;
    memoria: string;
    bateria: string;
    condicao: string;
    valor: string;
  };
  onClose: () => void;
  ownerPhoneNumber: string;
}

const generateWhatsAppLink = (
  ownerPhoneNumber: string,
  productName: string,
  productMemoria: string,
  productBateria: string,
  productCondicao: string,
  productValor: string,
  clientPagamento: string,
  clientName: string,
  clientPhone: string,
  clientAddress: string
) => {
  const mensagemBateria = productCondicao === "Novos" ? '' : `*Bateria:* ${productBateria}\n`;

  const message =
    `📦 *Produto:* ${productName}
*Memória:* ${productMemoria}
${mensagemBateria}*Condição:* ${productCondicao}
*Valor:* ${productValor}

💳 *Forma de Pagamento:* ${clientPagamento}

👤 *Cliente:* ${clientName}
📞 *Telefone:* ${clientPhone}
📍 *Endereço:* ${clientAddress}`;

  return `https://api.whatsapp.com/send?phone=${ownerPhoneNumber}&text=${encodeURIComponent(message)}`;
};


export default function CartFinalizar({ produto, onClose, ownerPhoneNumber }: CartFinalizarProps) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientPagamento, setClientPagamento] = useState('');

  const handleComprar = () => {
  const bateriaFormatada =
    produto.condicao === "Novos" ? "" : `${produto.bateria}%🔋`;

  const link = generateWhatsAppLink(
  ownerPhoneNumber,
  produto.name,
  `${produto.memoria}GB`,
  bateriaFormatada,
  produto.condicao,
  `R$ ${produto.valor}`,
  clientPagamento,
  clientName,
  clientPhone,
  clientAddress
);

  window.open(link, '_blank');
  onClose();
};



return (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Finalizar Compra</h2>
      <div className='campo'>
        <label>Nome completo:</label>
        <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
      </div>
      <div className='campo'>
        <label>Telefone:</label>
        <input type="text" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
      </div>
      <div className='campo'>
        <label>Endereço:</label>
        <input type="text" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
      </div>
      <div className='campo'>
        <label>Forma de Pagamento:</label>
        <select value={clientPagamento} onChange={(e) => setClientPagamento(e.target.value)}>
          <option value="">Selecione...</option>
          <option value="Pix">Pix</option>
          <option value="Cartão">Crédito / Débito</option>
        </select>
      </div>

      <div className='btn-modal'>
        <button onClick={onClose}> Cancelar </button>

        <button onClick={handleComprar}> <FaWhatsapp/> Finalizar </button>
      </div>
    </div>
  </div>
);
}
