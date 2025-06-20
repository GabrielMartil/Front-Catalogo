import { useState, useEffect, useRef } from 'react';
import './catalogo.css';
import CartFinalizar from './CartFinalizar/cartfinalizar';
import "../src/assets/styles/global.css";
import produto_sem_foto from './assets/img/sem-foto.png';

import Logo from './assets/img/logoaleximports.png';
import faixa from './assets/img/faixa.png';
import bateria from './assets/img/Battery.png';

import pix_img from "./assets/img/pix.png";
import mastercard_img from "./assets/img/mastercard.png";
import visa_img from "./assets/img/visa.png";
import elo_img from "./assets/img/elo.png";

import instagram from "./assets/img/Instagram.png";
import whatsapp from "./assets/img/WhatsApp.png";

import macbook_tx_top from "./assets/img/MacBook-tx-top.png";
import AppleWatch_tx_top from "./assets/img/AppleWatch-tx-top.png";

import Relogio_banner from "./assets/img/Watch-banner.png";

import { api } from './services/api';

import { FaShoppingCart } from 'react-icons/fa';

interface ProdutosProps {
  id: string,
  image: string,
  name: string,
  valor: string,
  memoria: string,
  bateria: string,
  categoria: string,
  condicao: string,
  descricao: string
};

export default function Catalogo() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [produtos, setProdutos] = useState<ProdutosProps[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutosProps | null>(null);

  useEffect(() => {
    loadProdutos();
  }, [])

  useEffect(() => {
    const updateParagraphCount = () => {
      if (divRef.current) {
        const divWidth = divRef.current.offsetWidth;
        const paragraphWidth = 100; // Largura aproximada de cada <p>
        setParagraphCount(Math.ceil(divWidth / paragraphWidth));
      }
    };

    // Atualiza ao montar
    updateParagraphCount();

    // Atualiza ao redimensionar a janela
    window.addEventListener('resize', updateParagraphCount);

    return () => {
      window.removeEventListener('resize', updateParagraphCount);
    };
  }, []);

  async function loadProdutos() {
    try {
      const response = await api.get('/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  }

  const iphonesNovos = produtos.filter(
    (p) => p.categoria?.toLowerCase() === 'iphone' && p.condicao?.toLowerCase() === 'novos'
  );

  const iphonesSeminovos = produtos.filter(
    (p) => p.categoria?.toLowerCase() === 'iphone' && p.condicao?.toLowerCase() === 'seminovos'
  );

  const ipadsNovos = produtos.filter(
    (p) => p.categoria?.toLowerCase() === 'ipad'
  );

  const macbooks = produtos.filter(
    (p) => p.categoria?.toLowerCase() === 'macbook'
  );

  const AppleWatch = produtos.filter(
    (p) => p.categoria?.toLowerCase() === 'applewatch'
  );

  const ownerPhoneNumber = '5585999268278';

  return (
    <div className="catalogo">
      <header>
        <img src={Logo} alt="logo" />
        <div className='text-header'>
          <h2>ALEX IMPORTS</h2>
          <p>FORTAL</p>
        </div>
        <h1>CATÁLOGO</h1>
      </header>

      <main>
        <div className='faixa'>
          <img src={faixa} alt="faixa" />
        </div>

        <section>
          <p>CATEGORIAS</p>

          <div className="categoria-btn">
            <a href="#Iphone" className="categoria-link"><p>Iphone</p></a>
            <a href="#IPad" className="categoria-link"><p>IPad</p></a>
            <a href="#MacBook" className="categoria-link"><p>MacBook</p></a>
            <a href="#AppleWatch" className="categoria-link"><p>Apple Watch</p></a>
          </div>
        </section>

        <div className='Novos-geral2' id='Iphone'>
          <div className='text-top-Novo'><p>Novos</p></div>
          <div className='Novos-geral'>
            {iphonesNovos.length === 0 ? (
              <p style={{ color: '#eb0000' }}>Nenhum produto cadastrado ainda.</p>
            ) : (
              iphonesNovos.map((produto) => {
                const isImagemValida = produto.image && produto.image.length > "data:image/jpeg;base64,".length;

                return (
                  <div key={produto.id} className='Novos-div'>
                    <img
                      src={
                        isImagemValida
                          ? (produto.image.startsWith("data:image")
                            ? produto.image
                            : `data:image/jpeg;base64,${produto.image}`)
                          : produto_sem_foto
                      }
                      alt={produto.name}
                      className="produto-imagem"
                      style={{ maxWidth:'140px'}}
                    />
                    <div className='Novos-infor'>
                      <div className='Novo-text'>
                        <p>{produto.name}</p>
                        <p>{produto.memoria}GB</p>
                      </div>
                      <p>R$ {produto.valor}</p>
                      <button
                        onClick={() => setProdutoSelecionado(produto)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          justifyContent: 'center'
                        }}
                      >
                        <FaShoppingCart />
                        COMPRAR
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {produtoSelecionado && (
            <CartFinalizar
              produto={produtoSelecionado}
              ownerPhoneNumber={ownerPhoneNumber}
              onClose={() => setProdutoSelecionado(null)}
            />
          )}
        </div>

        <div
          className="faixa_div"
          ref={divRef}
          style={{ width: '100%', overflow: 'hidden' }}

        >
          {Array.from({ length: paragraphCount }).map((_, index) => (
            <p key={index} style={{ margin: 0 }}>@alemimporsfortal</p>
          ))}
        </div>

        <div>
          <div className='text-top-Seminovos'><p>Seminovos</p></div>
        </div>
        <div>
          <div className='Seminovos-geral'>
            {iphonesSeminovos.length === 0 ? (
              <p style={{ color: '#eb0000' }}>Nenhum produto cadastrado ainda.</p>
            ) : (
              iphonesSeminovos.map((produto) => (
                <div className='Seminovos'>
                  <div className='Seminovos-div'>
                    <div className='Seminovos-infor'>
                      <div className='Seminovos-text'>
                        <p> {produto.name}</p>
                        <p style={{ lineHeight: 0 }}> {produto.memoria}GB </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", lineHeight: 0 }}>
                        <p style={{ lineHeight: 0 }}>{produto.bateria}% </p>
                        <img src={bateria} alt="bateria" style={{
                          width: 20, height: 20
                        }} />
                      </div>
                      <p style={{ lineHeight: 0, margin: 8 }}>R$ {produto.valor}</p>
                    </div>
                  </div>
                  <div className='Seminovos-infor-btn'>
                    <button
                      onClick={() => setProdutoSelecionado(produto)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center'
                      }}
                    >
                      <FaShoppingCart />
                      COMPRAR
                    </button>
                  </div>
                </div>
              )))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} id='IPad'>
          <div className='text-top-Ipad'><p>Ipad</p></div>
        </div>
        <div>
          <div className='IPad-geral'>
            {ipadsNovos.length === 0 ? (
              <p style={{ color: '#eb0000' }}>Nenhum produto cadastrado ainda.</p>
            ) : (
              ipadsNovos.map((produto) => {
                const isImagemValida = produto.image && produto.image.length > "data:image/jpeg;base64,".length;
                return (
                  <div key={produto.id} className='Novos-div-IPad'>
                    <img
                      src={
                        isImagemValida
                          ? (produto.image.startsWith("data:image")
                            ? produto.image
                            : `data:image/jpeg;base64,${produto.image}`)
                          : produto_sem_foto
                      }
                      alt={produto.name}
                      className="produto-imagem"
                      style={{ maxWidth: '170px' }}
                    />
                    <div className='Novos-infor-IPad'>
                      <div className='Novo-text-IPad'>
                        <p> {produto.name} </p>
                        <p> {produto.memoria}GB </p>
                      </div>
                      <p>R$ {produto.valor}</p>
                      <button
                        onClick={() => setProdutoSelecionado(produto)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          justifyContent: 'center'
                        }}
                      >
                        <FaShoppingCart />
                        COMPRAR
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} id='MacBook'>
          <div className='img-top-name'><img src={macbook_tx_top} alt="" /></div>
        </div>

        <div className='macbok-geral'>
          <div className='macbok-geral'>
            {macbooks.length === 0 ? (
              <p style={{ color: '#eb0000' }}>Nenhum produto cadastrado ainda.</p>
            ) : (
              macbooks.map((produto) => (
                <div key={produto.id} className='macbok-conteiner'>
                  {produto.image ? (
                    <img
                      src={
                        produto.image.startsWith("data:image")
                          ? produto.image
                          : `data:image/jpeg;base64,${produto.image}`
                      }
                      alt={produto.name}
                      className="macbok-produto-imagem"
                    />
                  ) : (
                    <div className="produto-imagem-placeholder">
                      <p>Imagem não disponível</p>
                    </div>
                  )}
                  <div className='Novos-infor-macbok'>
                    <div className='Novo-text-macbok'>
                      <p> {produto.name} </p>
                      <p>{produto.descricao}</p>
                      <p> {produto.memoria}GB </p>
                    </div>
                    <p style={{ marginTop: 10, marginBottom: 5 }}>R$ {produto.valor}</p>
                    <button
                      onClick={() => setProdutoSelecionado(produto)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center'
                      }}
                    >
                      <FaShoppingCart />
                      COMPRAR
                    </button>
                  </div>
                </div>
              )))}
          </div>
        </div>

        <div
          className="faixa_div"
          ref={divRef}
          style={{ width: '100%', overflow: 'hidden' }}
        >
          {Array.from({ length: paragraphCount }).map((_, index) => (
            <p key={index} style={{ margin: 0 }}>@alemimporsfortal</p>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
          <div className='relogio_banner'> <img src={Relogio_banner} alt="relogio banner" /></div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} id='AppleWatch'>
          <div className='img-top-name'><img src={AppleWatch_tx_top} alt="AppleWatch_tx_top" /></div>
        </div>

        <div className='relogio-geral'>
          <div className='macbok-geral'>
            {AppleWatch.length === 0 ? (
              <p style={{ color: '#eb0000' }}>Nenhum produto cadastrado ainda.</p>
            ) : (
              AppleWatch.map((produto) => (
                <div key={produto.id} className='watch-conteiner'>
                  {produto.image ? (
                    <img
                      src={
                        produto.image.startsWith("data:image")
                          ? produto.image
                          : `data:image/jpeg;base64,${produto.image}`
                      }
                      alt={produto.name}
                      className="produto-imagem"
                    />
                  ) : (
                    <div className="produto-imagem-placeholder">
                      <p>Imagem não disponível</p>
                    </div>
                  )}
                  <div className='Novos-infor-geral'>
                    <div className='Novo-text-geral'>
                      <p> {produto.name}</p>
                      <p>{produto.descricao}</p>
                    </div>
                    <p>R$ {produto.valor}</p>
                    <button
                      onClick={() => setProdutoSelecionado(produto)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center'
                      }}
                    >
                      <FaShoppingCart />
                      COMPRAR
                    </button>
                  </div>
                </div>
              )))}
          </div>

        </div>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h2>Alex Imports Fortal</h2>
            <p style={{ maxWidth: 400 }}>
              Cada cliente é parte da nossa história. Por isso, trabalhamos todos os dias para oferecer produtos que atendam às suas necessidades com qualidade e eficiência.
            </p>
          </div>
          <div className="footer-column" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3>Redes Sociais</h3>
            <div className="social-icons">
              <a href="#"><img src={instagram} alt="Instagram" /></a>
              <a href="#"><img src={whatsapp} alt="WhatsApp" /></a>
            </div>
            <h3>Pagamentos</h3>
            <div className="payment-icons">
              <img src={pix_img} alt="Pix" />
              <img src={mastercard_img} alt="MasterCard" />
              <img src={visa_img} alt="Visa" />
              <img src={elo_img} alt="Elo" />
            </div>
          </div>
        </div>

      </footer>
      <div className="footer-bottom">
        © @gmdev 2024 Alex Imports Fortal. Todos os direitos reservados.
      </div>
    </div>
  );
}
