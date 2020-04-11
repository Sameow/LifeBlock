pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

contract BlockEcosystem {
    using SafeMath for uint256;

    address contractOwner;

    enum Identity { undefined, individual, institution, owner }

    struct Interaction {
        bytes interactionHash;
        uint dateTime;
        address issuer;
        address issuee;
        bool isValid;
    }

    struct Feedback {
        uint id;
        bytes text;
        uint dateTime;
        address issuer;
        address issuee;
        bool isValid;
    }

    uint256 numberFeedback;

    constructor() public {
        contractOwner = msg.sender;
        userIdentity[msg.sender] = Identity.owner;
        authorizedList[msg.sender] = true;
        registeredName[msg.sender] = "Holala";
    }

    mapping(address => Identity) userIdentity;
    mapping(address => bytes) registeredName;

    mapping(address => bool) authorizedList;
    mapping(address => Interaction[]) individualProfile;
    // maps to address to interaction hash to index
    mapping(address => mapping(bytes => uint)) private _indexOfInteractionList;
    mapping(address => Feedback[]) organizationFeedback; 
    // maps to address to feedback id to index
    mapping(address => mapping(uint => uint)) private _indexOfFeedbackList;    
    
    mapping(address => Interaction[]) uploadedInteraction;
    mapping(address => mapping(bytes => uint)) private _indexOfUploadedInteraction;

    mapping(address => Feedback[]) addedFeedback;
    mapping(address => mapping(uint => uint)) private _indexOfAddedFeedback;


    event AddedInteraction(address);
    event AddedFeedBack(address);
    event RegisteredInstitution(address);
    event InvalidateInteraction(bytes);
    event InvalidateFeedback(uint, address);

    modifier isContractOwner() {
        require(msg.sender == contractOwner, "Only contract owner has access to this function!");
        _;
    }

    // check if identity is either contract owner or 
    modifier isAuthorized() {
        require(authorizedList[msg.sender] == true, "Only authorized parties have access to this function!");
        _;
    }

    modifier eitherRecipientOrIssuer(bytes memory interactionHash, address recipient) {
        uint interactionIndex = _indexOfInteractionList[recipient][interactionHash];
        address issuer = individualProfile[recipient][interactionIndex].issuer;
        require(msg.sender == recipient || msg.sender == issuer, "Only the recipient or issuer of interaction can invalidate it!");
        _;
    }

    modifier isFeedbackIssuer(uint feedbackID, address institution) {
        uint index = _indexOfFeedbackList[institution][feedbackID];
        address owner = organizationFeedback[institution][index].issuer;
        require(msg.sender == owner, "Only the feedback issuer has access to this function!");
        _;
    }

    modifier isRegisteredInstitution (address institutionAddress) {
        require(userIdentity[institutionAddress] == Identity.institution, "Institution is not registered!");
        _;
    }

    modifier isRegisteredUser() {
        require(userIdentity[msg.sender] == Identity.individual, "Only registered uesrs have access to this function!");
        _;
    }

    modifier isUnregisteredUser() {
        require(userIdentity[msg.sender] == Identity.undefined, "Only unregistered uesrs have access to this function!");
        _;
    }

    // Can only be performed by contract owner, on registered institutions
    function registerCA(address addressCA) public isContractOwner() isRegisteredInstitution(addressCA) {
        authorizedList[addressCA] = true;
    }

    function registerIndividual(bytes memory individualName) public isUnregisteredUser() {
        userIdentity[msg.sender] = Identity.individual;
        registeredName[msg.sender] = individualName;
    }

    function registerInstitution(address newInstitution, bytes memory institutionName) public isAuthorized() {
        userIdentity[newInstitution] = Identity.institution;
        registeredName[newInstitution] = institutionName;
    }

    function addInteraction(bytes memory interactionHash, uint timestamp, address recipient) public isRegisteredInstitution(msg.sender) {
        Interaction memory newInteraction = Interaction(interactionHash, timestamp, msg.sender, recipient, true);
        individualProfile[recipient].push(newInteraction);
        uint256 individualIndex = individualProfile[recipient].length;
        _indexOfInteractionList[recipient][interactionHash] = individualIndex - 1;
        
        uploadedInteraction[msg.sender].push(newInteraction);
        uint256 institutionIndex = uploadedInteraction[msg.sender].length;
        _indexOfUploadedInteraction[msg.sender][interactionHash] = institutionIndex - 1;
        emit AddedInteraction(recipient);
    }

    function invalidateInteraction(bytes memory interactionHash, address recipient) public eitherRecipientOrIssuer(interactionHash, recipient) {
        uint interactionIndex = _indexOfInteractionList[recipient][interactionHash];
        individualProfile[recipient][interactionIndex].isValid = false;
        emit InvalidateInteraction(interactionHash);
    }

    function addFeedback(bytes memory feedbackText, uint timestamp, address institution) public  isRegisteredUser() {
        uint newId = numberFeedback;
        numberFeedback = numberFeedback + 1; 
        Feedback memory newFeedback = Feedback(newId, feedbackText, timestamp, msg.sender, institution, true);
        organizationFeedback[institution].push(newFeedback);
        uint256 institutionIndex = organizationFeedback[institution].length;
        _indexOfFeedbackList[institution][newId] = institutionIndex - 1;

        addedFeedback[msg.sender].push(newFeedback);
        uint256 individualIndex = addedFeedback[msg.sender].length;
        _indexOfAddedFeedback[msg.sender][newId] = individualIndex - 1;
        emit AddedFeedBack(institution);
    }

    function invalidateFeedback(uint feedbackID, address institution) public isFeedbackIssuer(feedbackID, institution){
        uint feedbackIndex = _indexOfFeedbackList[institution][feedbackID];
        organizationFeedback[institution][feedbackIndex].isValid = false;
        emit InvalidateFeedback(feedbackID, institution);
    }


    // For institutions to retrieve all the interactions they uploaded.
    function getUploadedInteraction() public view isRegisteredInstitution(msg.sender) returns (Interaction[] memory) {
        return uploadedInteraction[msg.sender];
    }

    // For uesrs to retrieve all the feedback they added.
    function getAddedFeedback() public view isRegisteredUser() returns (Feedback[] memory) {
        return addedFeedback[msg.sender];
    }

    function getInteraction(address individual) public view returns (Interaction[] memory) {
        return individualProfile[individual];
    }

    function getFeedback(address institution) public view returns (Feedback[] memory) {
        return organizationFeedback[institution];
    }

    function checkUserIdentity(address userAddress) public view returns (Identity) {
        return userIdentity[userAddress];
    }

    function getName(address targettedAddress) public view returns (bytes memory) {
        return registeredName[targettedAddress];
    }   

}