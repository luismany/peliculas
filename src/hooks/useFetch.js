import { useState, useEffect } from "react";

export default function UseFetch(url, options) {
    
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            
            try {
                const resultado = await fetch(url, options);
                const json = await resultado.json();
                setResult(json);
                setLoading(false);

            } catch (err) {
                
                setError(err);
                setLoading(false);
            }
        })();
     
    }, [options, url]);
    

return { loading, result, error }
}