document.addEventListener('DOMContentLoaded', function() {
    const tasks = document.querySelectorAll('.task', '.day');
    const progressCircle = document.getElementById('progress-circle');
    let completedCount = 0;
    let totalCount = tasks.length;

    // Load completed tasks from local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('task-')) {
            const taskIndex = parseInt(key.split('-')[1]);
            tasks[taskIndex].classList.add('completed');
            completedCount++;
        }
    }

    updateProgress(); // Update progress initially

    tasks.forEach((task, index) => {
        task.addEventListener('click', function() {
            // Toggle completed class
            task.classList.toggle('completed');

            // Update completed count
            if (task.classList.contains('completed')) {
                completedCount++;
            } else {
                completedCount--;
            }

            // Update progress circle
            updateProgress();

            // Store completed state in local storage
            if (task.classList.contains('completed')) {
                localStorage.setItem(`task-${index}`, 'completed');
            } else {
                localStorage.removeItem(`task-${index}`);
            }
        });
    });

    function updateProgress() {
        const fillPercentage = (completedCount / totalCount) * 100;
        progressCircle.style.setProperty('--fill', `${fillPercentage}%`);
        progressCircle.textContent = `${Math.round(fillPercentage)}%`;
    }
});
