async function main(){
    const [deployer] = await ethers.getSigners();

    const Increment = await ethers.getContractFactory("Increment");
    const increment = await Increment.deploy();
    console.log("Increment address", increment.address);
}

main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.log(error, "Error deploying");
    process.exit(1);
})