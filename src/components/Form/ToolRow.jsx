function ToolRow({tool, index, updateTool, removeTool}) {
    return (
        <div>
            <div>
                <label >Tool</label>
                <select value={tool.name}
                 onChange={(e)=> {updateTool(index, "name", e.target.value)}}>

                    <option value="">Select Tool</option>
                    <option value="chatgpt">ChatGPT</option>
                    <option value="claude">Claude</option>
                    <option value="cursor">Cursor</option>
                    <option value="copilot">GitHub Copilot</option>
                    <option value="gemini">Gemini</option>
                    <option value="windsurf">Windsurf</option>

                 </select>               
            </div>
            <div>
                <label >Plan</label>
                <input type="text" 
                   value={tool.plan}
                   onChange={(e)=> {updateTool(index, "plan", e.target.value.toLowerCase())}} placeholder="e.g. Plus/Pro/Team"/>
            </div>
            <div>
                <label >Monthly Spend 💵</label>
                <input type="number" value={tool.monthlySpend} 
                onChange={(e)=> {updateTool(index, "monthlySpend", e.target.value)}} placeholder="20" />
            </div>
            <div>
                <label >Seats</label>
                <input type="number" value={tool.seats}
                onChange={(e)=> {updateTool(index, "seats", e.target.value)}} placeholder="1"/>
            </div>
            <button type="button" onClick={()=> removeTool(index)}
            >Remove</button>
        </div>
    )
}

export default ToolRow
