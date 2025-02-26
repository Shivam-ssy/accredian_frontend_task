import React, { useState } from "react";
import Header from "../components/Header";
import ReferralModal from "../components/ReferModal";

function Home() {
  const [isModalOpen, setIsModalOpen]=useState(false)
  return (
    <div className="w-full min-h-screen flex flex-col items-center ">
      <div className="bg-[#1A73E826] w-full flex gap-1 justify-center py-2">
        Navigate your ideal career path with tailored expert advice{" "}
        <span className="text-[#1A73E8]">Contact Expert</span>
      </div>
      <Header/>
      <div className="max-w-6xl w-full flex flex-col mt-10 items-center gap-10">
          <ul className="flex w-3xl justify-center py-2 gap-10 bg-[#1A73E81C] rounded-2xl px-10 text-lg">
            <li onClick={()=>setIsModalOpen(true)} className="text-[#1A73E8]">Refer</li>
            <li>Benifits</li>
            <li>FAQs</li>
            <li>Support</li>
          </ul>
      </div>
      <div className="max-w-6xl bg-[#1A73E8]/10 mt-10 w-full rounded-2xl flex items-center justify-center">
        <div>
        <h1 className="text-7xl font-bold">Let’s Learn <br />& Earn</h1>
        <div className="text-4xl my-5">Get a chance to win <br />
        up-to <span className="text-[#1A73E8]">Rs. 15,000</span></div>
        <button onClick={()=>setIsModalOpen(true)} className="bg-[#1A73E8] cursor-pointer rounded-lg py-2 px-7 text-white text-md ">Refer Now</button>

        </div>
        <img className="max-w-xl" src="/hero.png" alt="" />
      </div>
      <ReferralModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      
    </div>
  );
}

export default Home;
