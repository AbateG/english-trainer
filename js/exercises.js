/* exercises.js — renders a single exercise into the exercise card
   and reports the result back via callback(isCorrect).
   Exercise types: "mcq", "fill". Add new types here + in data.js.
*/
const Exercises = (() => {

  let activeKeyHandler = null;

  function normalize(str) {
    return str.trim().toLowerCase().replace(/[.,!?¿¡'"]/g, '').replace(/\s+/g, ' ');
  }

  function flash(el, correct) {
    el.classList.remove('flash-correct', 'flash-incorrect');
    // force reflow so the animation re-triggers even on repeated answers
    void el.offsetWidth;
    el.classList.add(correct ? 'flash-correct' : 'flash-incorrect');
  }

  function render(container, exercise, lang, onAnswered) {
    container.innerHTML = '';

    if (activeKeyHandler) {
      document.removeEventListener('keydown', activeKeyHandler);
      activeKeyHandler = null;
    }

    if (exercise.passage_en) {
      const passageBox = document.createElement('div');
      passageBox.className = 'passage-box';

      const passageText = document.createElement('p');
      passageText.className = 'passage-text';
      passageText.textContent = exercise.passage_en;
      passageBox.appendChild(passageText);

      if (exercise.passage_es) {
        const translation = document.createElement('p');
        translation.className = 'passage-translation hidden';
        translation.textContent = exercise.passage_es;
        passageBox.appendChild(translation);

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'passage-toggle';
        toggle.textContent = lang === 'es' ? 'Ver traducción' : 'Show translation';
        toggle.addEventListener('click', () => {
          const showing = !translation.classList.contains('hidden');
          translation.classList.toggle('hidden');
          toggle.textContent = showing
            ? (lang === 'es' ? 'Ver traducción' : 'Show translation')
            : (lang === 'es' ? 'Ocultar traducción' : 'Hide translation');
        });
        passageBox.appendChild(toggle);
      }
      container.appendChild(passageBox);
    }

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
        flash(input, correct);
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
      exercise.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-key">${i + 1}</span><span class="option-text"></span>`;
        btn.querySelector('.option-text').textContent = opt;
        btn.addEventListener('click', () => {
          const correct = opt === exercise.answer;
          [...opts.children].forEach(b => b.disabled = true);
          if (activeKeyHandler) { document.removeEventListener('keydown', activeKeyHandler); activeKeyHandler = null; }
          btn.classList.add(correct ? 'correct' : 'incorrect');
          flash(btn, correct);
          if (!correct) {
            [...opts.children].find(b => b.querySelector('.option-text').textContent === exercise.answer)
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

      activeKeyHandler = (e) => {
        const idx = parseInt(e.key, 10) - 1;
        const btn = opts.children[idx];
        if (btn && !btn.disabled) btn.click();
      };
      document.addEventListener('keydown', activeKeyHandler);
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
        flash(input, correct);
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
