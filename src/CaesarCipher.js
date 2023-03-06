import React, {useEffect, useState} from "react";
import './CaesarCipher.css';

function CaesarCipher() {
    const [plaintext, setPlaintext] = useState("");
    const [key, setKey] = useState(0);
    const [cipherText, setCiphertext] = useState("");
    const [decryptedText, setDecryptedText] = useState("");
    const [mode, setMode] = useState('encrypt');

    function handlePlaintextChange(event) {
        const text = event.target.value;
        setPlaintext(text);
    }

    function Encrypt(charCode, shift) {
        if (charCode >= 1040 && charCode <= 1103) {
            // А-я
            if (charCode === 1105) {
                // ё
                charCode = 1025; // Ё
            } else if (charCode === 1025 && shift <= 0) {
                // Ё, проверяем, что не отрицательный сдвиг
                charCode = 1105; // ё
            } else {
                charCode = ((charCode - 1040 + shift + 32) % 32) + 1040;
            }
        } else if (charCode === 1025 && shift >= 0) {
            // Ё, проверяем, что не положительный сдвиг
            charCode = 1105; // ё
        } else if (charCode === 1105 && shift <= 0) {
            // ё, проверяем, что не отрицательный сдвиг
            charCode = 1025; // Ё
        }
        return charCode;
    }

    useEffect(() => {
        let result = "";
        if (mode === 'encrypt') {
            for (let i = 0; i < plaintext.length; i++) {
                let charCode = plaintext.charCodeAt(i);
                charCode = Encrypt(charCode, key);
                result += String.fromCharCode(charCode);
            }
            setCiphertext(result);
        }

        if (mode === 'decrypt') {
            for (let i = 0; i < plaintext.length; i++) {
                let charCode = plaintext.charCodeAt(i);
                charCode = Encrypt(charCode, -key);
                result += String.fromCharCode(charCode);
            }
            setDecryptedText(result);
        }

    }, [key, plaintext, mode]);

    function handleKeyChange(event) {
        const value = event.target.value;
        if (value) {
            setKey(parseInt(value, 10));
        }
    }

    function handleModeChange(event) {
        setMode(event.target.value);
    }

    return (<>
        <h1 style={{'text-align': 'center'}}>Выполнил студент 20-КБ-ИБ2 Григорук</h1>
        <div className="form-container">
            <h2>Использование шифра Цезаря</h2>
            <div className="form-group">
                <label htmlFor="plaintext">Входное слово:</label>
                <input
                    className="form-input-control"
                    type="text"
                    id="plaintext"
                    value={plaintext}
                    onChange={handlePlaintextChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="key">Ключ шифрования:</label>
                <input type="number"
                       id="key"
                       value={key}
                       onChange={handleKeyChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="mode">Выберите режим работы:</label>
                <select id="mode" value={mode} onChange={handleModeChange}>
                    <option value="encrypt">Зашифровать</option>
                    <option value="decrypt">Дешифровать</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="ciphertext">Выходное слово:</label>
                <input className="form-input-control"
                       type="text"
                       id="ciphertext"
                       value={mode === "encrypt" ? cipherText : decryptedText}
                       readOnly/>
            </div>
        </div>

    </>);
}

export default CaesarCipher;