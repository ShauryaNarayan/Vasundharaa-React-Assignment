// src/App.jsx
import React from 'react';
import TodoApp from './components/Todo/TodoApp';
import UserForm from './components/Forms/UserForm';
import MultiProgressBar from './components/Progress/MultiProgressBar';
import CountdownTimer from './components/Timer/CountdownTimer';
import SearchList from './components/Search/SearchList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 space-y-12 pb-32">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2">My React Assignment</h1>
        <p className="text-gray-500">5 Tasks Combined into One App</p>
      </header>

      {/* Task 1 */}
      <section>
        <h2 className="text-center text-xl font-bold text-gray-700 mb-4">Task 1: Todo App</h2>
        <TodoApp />
      </section>

      <hr className="border-gray-200 max-w-2xl mx-auto" />

      {/* Task 2 */}
      <section>
        <h2 className="text-center text-xl font-bold text-gray-700 mb-4">Task 2: Form Validation</h2>
        <UserForm />
      </section>

      <hr className="border-gray-200 max-w-2xl mx-auto" />

      {/* Task 3 */}
      <section>
        <h2 className="text-center text-xl font-bold text-gray-700 mb-4">Task 3: Dynamic Progress</h2>
        <MultiProgressBar />
      </section>

      <hr className="border-gray-200 max-w-2xl mx-auto" />

      {/* Task 4 */}
      <section>
        <h2 className="text-center text-xl font-bold text-gray-700 mb-4">Task 4: Persistent Timer</h2>
        <CountdownTimer />
      </section>

      <hr className="border-gray-200 max-w-2xl mx-auto" />

      {/* Task 5 */}
      <section>
        <h2 className="text-center text-xl font-bold text-gray-700 mb-4">Task 5: Live Search</h2>
        <SearchList />
      </section>
    </div>
  );
}

export default App;