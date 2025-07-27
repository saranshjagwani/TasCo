import { useEffect, useState } from 'react';
import axios from '../axios';
import { Plus, Trash2, Calendar, CheckCircle } from 'lucide-react';

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    setIsLoading(false);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    setIsAdding(true);
    try {
      await axios.post('/tasks', { title, description, due_date: dueDate });
      await fetchTasks();
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      alert('Failed to add task');
    }
    setIsAdding(false);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch (error) {
      alert('Failed to delete task');
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getTaskPriority = (dueDate) => {
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return 'overdue';
    if (days <= 1) return 'urgent';
    if (days <= 3) return 'high';
    return 'normal';
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600">Stay organized and productive with your personal task manager</p>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8 backdrop-blur-sm bg-white/90">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-indigo-600" />
            Add New Task
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add task details..."
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
            />
          </div>

          <button
            onClick={addTask}
            disabled={isAdding || !title.trim()}
            className="w-full md:w-auto py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Add Task</span>
              </>
            )}
          </button>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No tasks yet</h3>
              <p className="text-gray-400">Add your first task to get started!</p>
            </div>
          ) : (
            tasks.map((task) => {
              const priority = getTaskPriority(task.due_date);
              const daysUntilDue = getDaysUntilDue(task.due_date);

              return (
                <div
                  key={task.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 border-l-4 transform hover:scale-[1.02] ${
                    priority === 'overdue'
                      ? 'border-red-500 bg-red-50/50'
                      : priority === 'urgent'
                      ? 'border-orange-500 bg-orange-50/50'
                      : priority === 'high'
                      ? 'border-yellow-500 bg-yellow-50/50'
                      : 'border-indigo-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                        {priority === 'overdue' && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                            Overdue
                          </span>
                        )}
                        {priority === 'urgent' && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                            Due Soon
                          </span>
                        )}
                      </div>
                      {task.description && (
                        <p className="text-gray-600 mb-3 leading-relaxed">{task.description}</p>
                      )}
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                        </div>
                        <span
                          className={`font-medium ${
                            priority === 'overdue'
                              ? 'text-red-600'
                              : priority === 'urgent'
                              ? 'text-orange-600'
                              : priority === 'high'
                              ? 'text-yellow-600'
                              : 'text-green-600'
                          }`}
                        >
                          {priority === 'overdue'
                            ? `${Math.abs(daysUntilDue)} days overdue`
                            : daysUntilDue === 0
                            ? 'Due today'
                            : daysUntilDue === 1
                            ? 'Due tomorrow'
                            : `${daysUntilDue} days left`}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-110"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
