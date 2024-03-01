exports.handler = async (event: any) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  // Process the S3 event
  for (const record of event.Records) {
    const eventName = record.eventName;
    const s3ObjectKey = record.s3.object.key;

    console.log(`Event Name: ${eventName}`);
    console.log(`S3 Object Key: ${s3ObjectKey}`);

    // Add your processing logic here
  }

  return "Processing complete.";
};
