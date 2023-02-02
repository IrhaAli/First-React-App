import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add text");
      return
    }

    onAdd({ text, day, reminder });

    setText("");
    setDay("");
    setReminder(false);
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
      {/* The task itself */}
      <div className="form-control">
        <label>
          Task
        </label>
        <input type="text" placeholder='Add a task' value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      {/* The day of the task */}
      <div className="form-control">
        <label>
          Day & Time
        </label>
        <input type="text" placeholder='Add Day & Time' value={day} onChange={(e) => setDay(e.target.value)} />
      </div>
      {/* Whether to set reminder or not */}
      <div className="form-control form-control-check">
        <label>
          Set Reminder
        </label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
      </div>
      {/* Submit the task */}
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask
