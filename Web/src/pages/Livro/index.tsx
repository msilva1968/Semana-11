import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Livro() {
  const { id } = useParams();
  const [livro, setLivro] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const adicionarAoCarrinho = async () => {
    try {
      const response = await fetch(`http://localhost:3000/carrinho/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmOGYxZGEyZi1iYzBjLTRmYmYtYTk5Zi1hMzA1YTdiYzcxYWYiLCJub21lVXN1YXJpbyI6Ik1hdGhldXMiLCJpYXQiOjE3MTY3MzM3NjAsImV4cCI6MTcxNjk5Mjk2MH0.PYlA384PlN5i5UkAP4bdjEpOzHnIniP8dp2eQh_LBqQ',
        },
        body: JSON.stringify({
          itensCarrinho: [{ livroId: id, quantidade: 1 }],
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        alert('Produto adicionado ao carrinho');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro ao adicionar o livro ao carrinho.');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const detalheLivro = async () => {
      try {
        const response = await fetch(`http://localhost:3000/livro/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLivro(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Ocorreu um erro ao buscar o livro.');
        }
      } finally {
        setLoading(false);
      }
    };

    detalheLivro();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Detalhe do Livro</h1>
      {livro ? (
        <div>
          <h2>{livro.titulo}</h2>
          <p>{livro.resumo}</p>
          <p><strong>ISBN:</strong>{livro.ISBN}</p>
          <p><strong>Author:</strong> {livro.autor.nome}</p>
          <p><strong>Price:</strong> ${livro.preco}</p>
        </div>
      ) : (
        <p>Livro não encontrado.</p>
      )}
      <button
        onClick={() => {
          navigate(-1);
        }}
      >{'< Voltar'}</button>
      <button
        onClick={() => { adicionarAoCarrinho() }}
      >{'Adicionar Ao Carrinho'}</button>
    </div>
  );
}