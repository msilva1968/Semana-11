import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Carrinho() {
  const { id } = useParams();
  const [carrinho, setCarrinho] = useState<any>(null);
  const [livro, setLivro] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const detalheCarrinho = async () => {
      try {
        const response = await fetch(`http://localhost:3000/carrinho/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCarrinho(data);

        carrinho.itensCarrinho.forEach(async (item: any) => {
          const livroId = item.livroId;
          const responseLivro = await fetch(`http://localhost:3000/livro/${livroId}`);
          if (!responseLivro.ok) {
            throw new Error(`Erro: ${responseLivro.status}`);
          }
          const data = response.json();
          setLivro(data);
        });

      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Ocorreu um erro');
        }
      }
    };

    detalheCarrinho();
  }, [id]);

  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Carrinho</h1>
      {livro ? (
        livro.map((livro: any) => (
          <div key={livro.id}>
            <h2>{livro.titulo}</h2>
            <p>{livro.resumo}</p>
            <p><strong>ISBN:</strong>{livro.ISBN}</p>
            <p><strong>Preço:</strong> ${livro.preco}</p>
          </div>
        ))
      ) : (
        <p>Livro não encontrado.</p>
      )}
      <button
        onClick={() => {
          navigate(-1);
        }}
      >{'< Voltar'}</button>
    </div>
  );
}