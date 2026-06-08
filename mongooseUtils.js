// Utility to wrap Mongoose operations with fallback handling
const timeoutMs = 5000; // Timeout for operations

function isBufferingError(err) {
  return err && (err.message && err.message.includes("buffering timed out") || 
         err.message.includes("Cannot call"));
}

async function executeWithTimeout(mongoosePromise, fallbackFn) {
  if (!global.mongodbConnected) {
    console.log("MongoDB not connected, using fallback");
    return await fallbackFn();
  }

  try {
    // Create a race between the mongoose promise and a timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("operation timeout")), timeoutMs)
    );

    return await Promise.race([mongoosePromise, timeoutPromise]);
  } catch (err) {
    if (isBufferingError(err) || err.message === "operation timeout") {
      console.log("Mongoose operation timeout or buffering error:", err.message);
      return await fallbackFn();
    }
    throw err;
  }
}

module.exports = {
  executeWithTimeout,
  isBufferingError,
};
