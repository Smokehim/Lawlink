import Form from "next/form"

function MainService(){
    return(
        <div className="p-10 text-white space-y-5 bg-orange-500">
            <h1 className="text-4xl font-bold">Search Top Lawyers Near You</h1>
            <p className="text-xl">
                Get customized search results easily.
                Tell us your legal issue and location,
                and we`ll do the rest
            </p>
            <div className="flex flex-col items-baseline text-black p-5 ">
                <div className="flex p-1 gap-2">
                    <div className="p-5 border border-white bg-white   ">
                        <p>Attorneys by legal issues</p>
                    </div>
                    <div className="border border-white bg-white p-5 ">
                        <p>Attorney by name</p>
                    </div>
                    <div className="border border-white bg-white p-5 ">
                        <p>Attorney by Location</p>
                    </div>
                </div>
                <Form action="" className="flex flex-col gap-3  p-5 bg-white" >
                    <p>Enter information in one or both fields. (Required)</p>
                    <div className="flex items-baseline gap-8">
                        <div className="flex flex-col">
                            <label htmlFor="">Legal issue</label>
                            <input
                                className="border border-black p-5 w-96 h-10 rounded-sm"
                                type="text"
                                placeholder="Enter legal issue"
                                title="Legal issue"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Location</label>
                            <input
                                className="border border-black p-5 w-96 h-10"
                                type="text"
                                placeholder="Enter location"
                                title="Location"
                            />
                        </div>
                    </div>
                        <div className="flex justify-baseline ">
                            <button className="border border-orange-500 text-white hover:text-orange-500 bg-orange-500 p-3 w-30   rounded-sm">Find a lawyer</button>
                        </div>
                </Form>
            </div>
        </div>
    )
}
export default  MainService