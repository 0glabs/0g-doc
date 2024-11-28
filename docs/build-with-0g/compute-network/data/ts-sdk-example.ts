import { ethers } from "ethers";
import { createZGServingNetworkBroker } from "@0glabs/0g-serving-broker";
import OpenAI from "openai";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://evmrpc-testnet.0g.ai");

  // Step 1: Create a wallet with a private key
  const privateKey =
    "Please input your private key, and make sure it has enough testnet 0GAI token";
  const wallet = new ethers.Wallet(privateKey, provider);

  // Step 2: Initialize the broker
  try {
    const broker = await createZGServingNetworkBroker(wallet);

    // Step 3: List available services
    console.log("Listing available services...");
    const services = await broker.listService();
    services.forEach((service: any) => {
      console.log(
        `Service: ${service.name}, Provider: ${service.provider}, Type: ${service.serviceType}, Model: ${service.model}, URL: ${service.url}`
      );
    });

    // Step 3.1: Select a service
    const service = services.find(
      (service: any) => service.name === "Please input the service name"
    );
    if (!service) {
      console.error("Service not found.");
      return;
    }
    const providerAddress = service.provider;

    // Step 4: Manage Accounts
    const initialBalance = 0.00000001;
    // Step 4.1: Create a new account
    console.log("Creating a new account...");
    await broker.addAccount(providerAddress, initialBalance);
    console.log("Account created successfully.");

    // Step 4.2: Deposit funds into the account
    const depositAmount = 0.00000002;
    console.log("Depositing funds...");
    await broker.depositFund(providerAddress, depositAmount);
    console.log("Funds deposited successfully.");

    // Step 4.3: Get the account
    const account = await broker.getAccount(providerAddress);
    console.log(account);

    // Step 5: Use the Provider's Services
    console.log("Processing a request...");
    const serviceName = service.name;
    const content = "Please input your message here";

    // Step 5.1: Get the request metadata
    const { endpoint, model } = await broker.getServiceMetadata(
      providerAddress,
      serviceName
    );

    // Step 5.2: Get the request headers
    const headers = await broker.getRequestHeaders(
      providerAddress,
      serviceName,
      content
    );

    // Step 6: Send a request to the service
    const openai = new OpenAI({
      baseURL: endpoint,
      apiKey: "",
    });
    const completion = await openai.chat.completions.create(
      {
        messages: [{ role: "system", content }],
        model: model,
      },
      {
        headers: {
          ...headers,
        },
      }
    );

    const receivedContent = completion.choices[0].message.content;
    const chatID = completion.id;
    if (!receivedContent) {
      throw new Error("No content received.");
    }
    console.log("Response:", receivedContent);

    // Step 7: Process the response
    console.log("Processing a response...");
    const isValid = await broker.processResponse(
      providerAddress,
      serviceName,
      receivedContent,
      chatID
    );
    console.log(`Response validity: ${isValid ? "Valid" : "Invalid"}`);
  } catch (error) {
    console.error("Error during execution:", error);
  }
}

main();
