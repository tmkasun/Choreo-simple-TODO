import { nanoid } from 'nanoid';

export function getVisibleTodos(todos, showActive) {
  const activeTodos = todos.filter(todo => !todo.done);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}

export function createTodo(text, done = false) {
  return {
    text,
    done
  };
}


export function generateCodeVerifier() {
  return nanoid(48);
}

export function generateHash(value) {
  /**
   * 
    plain
        code_challenge = code_verifier

    S256
        code_challenge = BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))
   */
  const encoder = new TextEncoder();
  return crypto.subtle
    .digest('SHA-256', encoder.encode(value))
    .then((hashedCC) => arrayBufferToBase64(hashedCC));
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  const b64 = window.btoa(binary);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}