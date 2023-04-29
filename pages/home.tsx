import Image from 'next/image'

export default function Dashboard() {
    // Function to click an image and add a number marker on the exact position of the click, but also make it draggable

    return (
        <div className='container'>
            <h1>Dashboard</h1>
            <div className="h-screen grid grid-cols-3 divide-x">
                <div className="h-screen grid place-items-center">
                    <div className="h-[729px] w-[340px] overflow-y-auto rounded-[3rem] ring-8 ring-slate-800 overflow-hidden">

                    </div>
                </div>
                <div className='col-span-2 h-screen flex flex-col bg-slate-100'>
                    <div className="flex-1 overflow-y-auto p-8">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
