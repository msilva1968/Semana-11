import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const url = 'http://localhost:3000/livro';
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listarLivros = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLivros(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Ocorreu um erro ao listar os livros.');
        }
      } finally {
        setLoading(false);
      }
    };

    listarLivros();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="App">
      <h1>Lista de Livros</h1>
      {livros.length === 0 && <p>Nenhum livro encontrado.</p>}
      {livros.map((livro: any) => (
        <div key={livro.id}>
          <h2>{livro.titulo}</h2>
          <strong>Autor:</strong> {livro.nomeAutor}
          <button
            onClick={() => {
              navigate(`/livro/${livro.id}`);
            }}
          >{'> Ver detalhes'}</button>
        </div>
      ))}
    </div>
  );
}