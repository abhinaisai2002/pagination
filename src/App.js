
import Pagination from './components/Pagination';
  
function App() {

  const handlePrevious = () => {
    console.log("Prevoius");
    
  }
  const handleNext = () => {
    console.log("Next");
  }
  

  return (
    <div>
      <Pagination
        url={'http://65.0.131.46:5000/posts'}
        limit={10}
        page={1}
        template={<Post />}
        onPreviousClicked={handlePrevious }
        onNextClicked={handleNext}
        buttonGroupClass=''
        previousButtonClass=''
        nextButtonClass=''
        pageButtonClass=''
      />
    </div>
  );
}


export const Post = ({userId,postId,title,body}) => {
    return (
        <div>
            <h1 className='heading'>UserId : {userId}</h1>
            <h5>PostId : {postId}</h5>
            <div>
                <h5>Title : {title}</h5>
                <p>Body : {body}</p>
            </div>
        </div>
    );
}

export default App;
