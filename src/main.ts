import './style.css'

type Lesson = {
  title: string
  focus: string
  minutes: number
  completed: boolean
}

const lessons: Lesson[] = [
  {
    title: 'Basic types',
    focus: 'string, number, boolean, arrays',
    minutes: 30,
    completed: true,
  },
  {
    title: 'Object shapes',
    focus: 'type aliases and optional fields',
    minutes: 45,
    completed: false,
  },
  {
    title: 'Async data',
    focus: 'Promise results and API response types',
    minutes: 60,
    completed: false,
  },
]

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root element was not found.')
}

const completedCount = lessons.filter((lesson) => lesson.completed).length
let selectedLessonIndex = 0

const renderLessonList = (items: Lesson[]): string =>
  items
    .map(
      (lesson, index) => `
        <button class="lesson-row" data-lesson-index="${index}" type="button">
          <span>
            <strong>${lesson.title}</strong>
            <small>${lesson.focus}</small>
          </span>
          <span class="status ${lesson.completed ? 'done' : 'queued'}">
            ${lesson.completed ? 'Done' : `${lesson.minutes} min`}
          </span>
        </button>
      `,
    )
    .join('')

const render = (): void => {
  const selectedLesson = lessons[selectedLessonIndex]

  app.innerHTML = `
    <section class="shell">
      <div class="summary">
        <p class="eyebrow">TypeScript practice</p>
        <h1>${selectedLesson.title}</h1>
        <p class="focus">${selectedLesson.focus}</p>
        <dl>
          <div>
            <dt>Completed</dt>
            <dd>${completedCount}/${lessons.length}</dd>
          </div>
          <div>
            <dt>Current session</dt>
            <dd>${selectedLesson.minutes} min</dd>
          </div>
        </dl>
      </div>

      <div class="lesson-list" aria-label="Lessons">
        ${renderLessonList(lessons)}
      </div>
    </section>
  `

  document.querySelectorAll<HTMLButtonElement>('.lesson-row').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.lessonIndex)

      if (!Number.isNaN(index)) {
        selectedLessonIndex = index
        render()
      }
    })
  })
}

render()
