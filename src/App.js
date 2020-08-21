import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([]);

    async function handleAddRepository() {
        const response = await api.post('repositories', {
            title: `Título${Date.now()}`,
            url: "",
            techs: ['Node.js', 'ReactJS', 'React Native']
        })

        setRepositories([...repositories, response.data]);
    }

    async function handleRemoveRepository(id) {
        try {
            await api.delete(`repositories/${id}`)

            setRepositories([...repositories].filter(repository => repository.id !== id));
        }catch (err){
            console.log(err);
            alert('Não foi possível remover repositório. Tente novamente mais tarde!')
        }
    }

    useEffect(() => {
        async function loadRepositories(){
            const response = await api.get('repositories');

            setRepositories(response.data);
        }

        loadRepositories();
        
    }, [])

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map(repository => (
                    <li key={repository.id}>
                        {repository.title}

                        <button onClick={() => handleRemoveRepository(repository.id)}>
                            Remover
                        </button>
                    </li>
                ))}
                
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
