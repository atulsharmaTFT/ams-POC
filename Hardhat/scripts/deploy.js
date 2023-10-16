async function main(){
    const [deployer] = await ethers.getSigners();

    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    console.log("Increment address", counter.address);
}

main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.log(error, "Error deploying");
    process.exit(1);
})