document.addEventListener('DOMContentLoaded', function() {
    const tasks = document.querySelectorAll('.task', '.day');

    // Load completed tasks from local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('task-')) {
            const taskIndex = parseInt(key.split('-')[1]);
            tasks[taskIndex].classList.add('completed');
        }
    }

    tasks.forEach((task, index) => {
        task.addEventListener('click', function() {
            // Toggle completed class
            task.classList.toggle('completed');

            // Store completed state in local storage
            if (task.classList.contains('completed')) {
                localStorage.setItem(`task-${index}`, 'completed');
            } else {
                localStorage.removeItem(`task-${index}`);
            }
        });
    });
});
