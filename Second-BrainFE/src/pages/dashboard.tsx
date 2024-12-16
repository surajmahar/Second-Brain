import { useState } from "react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { CreateContentModel } from "../components/createcontentmodel";
import { Plusicon } from "../icons/plusicon";
import { Shareicon } from "../icons/shareicon";
import { Sidebar } from "../components/sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";
export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
const contents =useContent();

  return (<div>
    <Sidebar/>
      <div className="p-4 ml-72 min-h-screen border-1 bg-slate-200">
        <div className="flex justify-end gap-4">
          <CreateContentModel
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
          />
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variant="secondary"
            text="Add content"
            startIcon={<Plusicon />}
          ></Button>
          <Button onClick={async () => {
            const response =await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
              share: true
            },{
              headers: {
                "Authorization": localStorage.getItem("token")
              }
            });
            const shareurl =`http://localhost:5173/share/${response.data.hash}`;
            alert(shareurl)
          }}
          
            variant="primary"
            text="Share brain"
            startIcon={<Shareicon />}
          ></Button>
        </div>
        <div className="flex gap-4 flex-wrap">
       {contents.map(({type, link, title}) => <Card
            type={type}
            link={link}
            title={title}
            />)}
          
    
          
         
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
