import './style.css'
import {
  createUserLabel,
  getActiveUsers,
  getAverageScore,
  practiceUsers,
} from './exercises/basic-types'
import {
  formatLastLogin,
  getMembersByStatus,
  getStatusLabel,
  getWebsiteLabel,
  teamMembers,
} from './exercises/optional-union'
import { parseSamplePayloads } from './exercises/narrowing-unknown'

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
    focus: 'optional fields and union types',
    minutes: 45,
    completed: true,
  },
  {
    title: 'Async data',
    focus: 'unknown values and narrowing',
    minutes: 60,
    completed: true,
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

const renderPracticeUsers = (): string =>
  practiceUsers
    .map(
      (user) => `
        <li>
          <span>
            <strong>${user.name}</strong>
            <small>${createUserLabel(user)}</small>
          </span>
          <span class="score">${user.score}</span>
        </li>
      `,
    )
    .join('')

const renderTeamMembers = (): string =>
  teamMembers
    .map(
      (member) => `
        <li>
          <span>
            <strong>${member.name}</strong>
            <small>${member.role} / ${getWebsiteLabel(member)}</small>
          </span>
          <span>
            <span class="status ${member.status}">${getStatusLabel(member.status)}</span>
            <small>${formatLastLogin(member.lastLoginAt)}</small>
          </span>
        </li>
      `,
    )
    .join('')

const renderParseResults = (): string =>
  parseSamplePayloads()
    .map(
      (result) => `
        <li>
          ${
            result.ok
              ? `
                <span>
                  <strong>${result.user.name}</strong>
                  <small>${result.user.email}</small>
                </span>
                <span class="status done">Parsed</span>
              `
              : `
                <span>
                  <strong>Invalid payload</strong>
                  <small>${result.error}</small>
                </span>
                <span class="status suspended">Rejected</span>
              `
          }
        </li>
      `,
    )
    .join('')

const render = (): void => {
  const selectedLesson = lessons[selectedLessonIndex]
  const activeUsers = getActiveUsers(practiceUsers)
  const averageScore = getAverageScore(practiceUsers)
  const invitedMembers = getMembersByStatus(teamMembers, 'invited')
  const parseResults = parseSamplePayloads()
  const validPayloads = parseResults.filter((result) => result.ok)

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

      <section class="exercise-panel">
        <div>
          <p class="eyebrow">Week 1</p>
          <h2>Basic Types Exercise</h2>
          <p>
            User data is typed in <code>src/exercises/basic-types.ts</code>.
          </p>
        </div>
        <div class="exercise-stats">
          <span>${activeUsers.length} active users</span>
          <span>${averageScore} average score</span>
        </div>
        <ul class="user-list">
          ${renderPracticeUsers()}
        </ul>
      </section>

      <section class="exercise-panel">
        <div>
          <p class="eyebrow">Week 1</p>
          <h2>Optional & Union Exercise</h2>
          <p>
            Member data is typed in <code>src/exercises/optional-union.ts</code>.
          </p>
        </div>
        <div class="exercise-stats">
          <span>${invitedMembers.length} invited member</span>
          <span>${teamMembers.length} total members</span>
        </div>
        <ul class="user-list member-list">
          ${renderTeamMembers()}
        </ul>
      </section>

      <section class="exercise-panel">
        <div>
          <p class="eyebrow">Week 1</p>
          <h2>Narrowing & Unknown Exercise</h2>
          <p>
            API-like payloads are checked in <code>src/exercises/narrowing-unknown.ts</code>.
          </p>
        </div>
        <div class="exercise-stats">
          <span>${validPayloads.length} valid payload</span>
          <span>${parseResults.length} checked payloads</span>
        </div>
        <ul class="user-list member-list">
          ${renderParseResults()}
        </ul>
      </section>
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
