import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Create = () => {
    const [title , setTitle] = useState('');
    const [body , setBody] = useState('');
    const [isPending , setIsPending] = useState(false);
    const [author , setAuthor] = useState('mario');
    const history = useHistory();



    const handleSubmit = (e) =>{
        e.preventDefault();
        const blog = {title , body , author};
        fetch('http://localhost:8000/blogs',{
            method:'POST',
            headers:{"content-Type":"application/json"},
            body: JSON.stringify(blog)
        }).then(()=>{
            setIsPending(false);
            // history.go(-1);
            history.push('/');
        })
        
        


    }
    return ( 
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label > Blog title :</label>
                <input 
                type="text"
                required
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}

                />
                <label > Blog Body:</label>
                <textarea 
                required
                rows="8"
                value={body}
                onChange={(e)=>{setBody(e.target.value)}}
                />
                <label >Blog Author:</label>
                <select 
                value={author}
                onChange={(e)=>{setAuthor(e.target.value)}}>
                    <option vlaue="mario"> mario</option>
                    <option vlaue="yoshi">yoshi</option>
                </select>
                <button>Add Blog</button>
            </form>
        </div>
     );
}
 
export default Create;