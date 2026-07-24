/* exercises.js — renders a single exercise into the exercise card
   and reports the result back via callback(isCorrect).
   Exercise types: "mcq", "fill". Add new types here + in data.js.
*/
const Exercises = (() => {

  function normalize(str) {
    return str.trim().toLowerCase().replace(/[.,!?¿¡'"]/g, '').replace(/\s+/g, ' ');
  }

  function render(container, exercise, lang, onAnswered) {
    container.innerHTML = '';

    const label = document.createElement('div');
    label.className = 'exercise-prompt-label';
    label.textContent = lang === 'es' ? 'Pregunta' : 'Question';
    container.appendChild(label);

    const promptRow = document.createElement('div');
    promptRow.className = 'prompt-row';
    const prompt = document.createElement('p');
    prompt.className = 'exercise-prompt';
    prompt.textContent = lang === 'es' ? exercise.prompt_es : exercise.prompt_en;
    promptRow.appendChild(prompt);
    if (exercise.speak) {
      promptRow.appendChild(Pronounce.makeSpeakerButton(exercise.speak, lang));
    }
    container.appendChild(promptRow);

    const feedback = document.createElement('div');
    feedback.className = 'exercise-feedback';

    if (exercise.type === 'listen') {
      const hint = document.createElement('p');
      hint.className = 'listen-hint';
      hint.textContent = lang === 'es'
        ? 'Presiona 🔊 para escuchar, luego escribe lo que oigas.'
        : 'Press 🔊 to listen, then type what you hear.';
      container.appendChild(hint);

      const input = document.createElement('input');
      input.className = 'fill-input';
      input.type = 'text';
      input.placeholder = lang === 'es' ? 'Escribe lo que escuchaste...' : 'Type what you heard...';
      container.appendChild(input);

      const actions = document.createElement('div');
      actions.className = 'exercise-actions';
      const checkBtn = document.createElement('button');
      checkBtn.className = 'primary-btn';
      checkBtn.textContent = lang === 'es' ? 'Verificar' : 'Check';
      actions.appendChild(checkBtn);
      container.appendChild(actions);

      const check = () => {
        const val = normalize(input.value);
        const correct = val === normalize(exercise.answer);
        input.disabled = true;
        checkBtn.disabled = true;
        feedback.textContent = correct
          ? (lang === 'es' ? '¡Correcto!' : 'Correct!')
          : (lang === 'es' ? `Incorrecto. Respuesta: ${exercise.answer}` : `Incorrect. Answer: ${exercise.answer}`);
        feedback.className = 'exercise-feedback ' + (correct ? 'correct' : 'incorrect');
        onAnswered(correct);
      };
      checkBtn.addEventListener('click', check);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
      setTimeout(() => Pronounce.speak(exercise.speak || exercise.answer), 300);
    }

    if (exercise.type === 'mcq') {
      const opts = document.createElement('div');
      opts.className = 'options';
      exercise.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          const correct = opt === exercise.answer;
          [...opts.children].forEach(b => b.disabled = true);
          btn.classList.add(correct ? 'correct' : 'incorrect');
          if (!correct) {
            [...opts.children].find(b => b.textContent === exercise.answer)
              ?.classList.add('correct');
          }
          feedback.textContent = correct
            ? (lang === 'es' ? '¡Correcto!' : 'Correct!')
            : (lang === 'es' ? `Incorrecto. Respuesta: ${exercise.answer}` : `Incorrect. Answer: ${exercise.answer}`);
          feedback.className = 'exercise-feedback ' + (correct ? 'correct' : 'incorrect');
          onAnswered(correct);
        });
        opts.appendChild(btn);
      });
      container.appendChild(opts);
    }

    if (exercise.type === 'fill') {
      const input = document.createElement('input');
      input.className = 'fill-input';
      input.type = 'text';
      input.placeholder = lang === 'es' ? 'Escribe tu respuesta...' : 'Type your answer...';
      container.appendChild(input);

      const actions = document.createElement('div');
      actions.className = 'exercise-actions';
      const checkBtn = document.createElement('button');
      checkBtn.className = 'primary-btn';
      checkBtn.textContent = lang === 'es' ? 'Verificar' : 'Check';
      actions.appendChild(checkBtn);
      container.appendChild(actions);

      const check = () => {
        const val = normalize(input.value);
        const correct = val === normalize(exercise.answer);
        input.disabled = true;
        checkBtn.disabled = true;
        feedback.textContent = correct
          ? (lang === 'es' ? '¡Correcto!' : 'Correct!')
          : (lang === 'es' ? `Incorrecto. Respuesta: ${exercise.answer}` : `Incorrect. Answer: ${exercise.answer}`);
        feedback.className = 'exercise-feedback ' + (correct ? 'correct' : 'incorrect');
        onAnswered(correct);
      };
      checkBtn.addEventListener('click', check);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
      setTimeout(() => input.focus(), 50);
    }

    container.appendChild(feedback);
  }

  return { render };
})();
