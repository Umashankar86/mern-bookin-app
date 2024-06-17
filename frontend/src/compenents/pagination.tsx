export type Props={
page:number;
pages:number;
onpageChange:(page:number)=>void;
}

const Pagination =({page,pages,onpageChange}:Props)=>{
    const pageNumbers=[];
    for(let i=1;i<=pages;i++){
    pageNumbers.push(i);

    }

    return(
    <div className="flex justify-center"><ul className="flex border border-slate-300">
        {pageNumbers.map((number)=>(

            <li className={`px-2 px-1 ${page===number?"bg-gray-200":" "}`}>
                <button onClick={()=>onpageChange(number)}>{number}</button>
            </li>
        ))}
        </ul></div>
        
    )
}

export default Pagination;