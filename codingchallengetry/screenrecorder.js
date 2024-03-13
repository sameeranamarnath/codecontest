const startRecordingButton = document.getElementById("start-recording");

// Replace with your Azure Blob Storage connection details
const storageConnectionString = "your_connection_string";
const containerName = "recordings";


let  state="notRecording";

let recorder = undefined; // will be used later 
startRecordingButton.addEventListener("click", async () => {
  
  if(state=="notRecording")
  {
    clickHandler();
    
  }
  else if(state=="recording")
  {
    //startRecordingButton.addEventListener("click", () => {


        recorder.stopRecording(async videoBlob => {
          // Upload video to Azure Blob Storage
          //await uploadVideoToAzure(videoBlob);          
          // Save video to disk
          saveVideoToDisk(videoBlob);
          console.log("Recording uploaded to Azure Storage!");
          startRecordingButton.textContent="Start Recording";  
    
        });


      //});
    
  }

});


let clickHandler =function()
{
    

// Request screen capture permission
navigator.mediaDevices.getDisplayMedia({ video: true })
.then(async stream => {
    
   recorder = RecordRTC(stream, {
    type: "video",
    mimeType: "video/mp4"
  });


  recorder.startRecording();

  state="recording";


  startRecordingButton.textContent = "Stop Recording";
  


})
.catch(error => {
  console.error("Error accessing screen:", error);
});


}

    


function saveVideoToDisk(blob) {
    if (!window.URL.createObjectURL) {
      console.error("Saving to disk not supported in this browser");
      return;
    }
  
    const videoURL = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = videoURL;
    a.download = `recording-${Date.now()}.webm`;
    a.click();
  
    // Revoke the temporary object URL to avoid memory leaks
    window.URL.revokeObjectURL(videoURL);
  }

async function uploadVideoToAzure(blob) {
  const sasUrl = await getSasToken(); // Replace with your function to generate SAS token
  const blobName = `recording-${Date.now()}.webm`;

  const response = await fetch(sasUrl, {
    method: "PUT",
    body: blob,
    headers: {
      "Content-Type": "video/webm"
    }
  });

  if (!response.ok) {
    throw new Error("Error uploading video to Azure Storage");
  }
}

// Replace with your function to generate a Shared Access Signature (SAS) token for Azure Blob Storage
async function getSasToken() {
  // Implement logic to generate SAS token using Azure Storage SDK or REST API
  throw new Error("Replace this with your Azure Storage SAS token generation logic");
}
