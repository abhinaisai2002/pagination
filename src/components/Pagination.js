import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function Pagination({
    url, limit,
    template,
    onPreviousClicked: handlePreviousEvent,
    onNextClicked: handleNextEvent,
    previousButtonStyle,
    nextButtonStyle,
    pageButtonStyle,
    buttonGroupClass,
    ...props }) {
    
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(props.page || 1);
    const [pages, setPages] = useState(0);

    
    useEffect(() => {
        const urlObject = new URL(url);
        const urlParams = new URLSearchParams(urlObject.search);
        urlParams.append('page', page);
        urlParams.append('limit', limit||10);
        urlObject.search = urlParams.toString();
        setLoading(true);
        axios.get(urlObject.href).then(res => {                
                setData(res.data.data);
                setPages(res.data.pages);
                setLoading(false);

        }).catch(err => {
            console.log(err);
        })
    }, [axios, page])
    

    const handlePrevious = () => {
        setPage(p => {
            if (p == 0) return 0;
            return p - 1;
        });
        handlePreviousEvent();
    }
    const handleNext = () => {
        setPage(p => {
            if (p == pages) return p;
            return p + 1;
        })
        handleNextEvent();
    }

    if (loading) {
        return <div>Loading.....</div>
    }
    return (
        <div>
            {data.length === 0 && <p>No data to show.</p>}
            {
                data.map(data => (
                    React.cloneElement(template, {
                        key   : data.id ,
                        userId:data.userId,
                        title :data.title,
                        body  :data.body,
                        postId: data.id ,
                    })
                ))
            }
            {
                <div style={{display:'flex',justifyContent:'center'}} className={buttonGroupClass}>

                    {data.length !== 0 &&
                        <>
                        
                            {page !== 1 && <button className={previousButtonStyle} onClick={handlePrevious}>Previous</button>}
                            <button className={pageButtonStyle} disabled>{page}</button>
                            {page !== pages && <button className={nextButtonStyle} onClick={handleNext}>Next</button>}
                        </>}
                    {data.length === 0 && <button onClick={()=>setPage(1)}>Home Page</button>}
                
                </div>
            }
        </div>
    )
}
