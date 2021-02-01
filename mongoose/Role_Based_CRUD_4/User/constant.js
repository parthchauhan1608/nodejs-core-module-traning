
exports.http_codes = {
    ok:200,
    created:201,
    bad_request:400,
    unauthorized:401,
    forbidden:403,
    not_found:404,
    request_timeout:408,
    internalServerError : 500
};

exports.message = {
    invalid_name : "Invalid Name",
    invalid_email : "Invalid Email",
    strong_password : "Enter strong-Password",
    invalid_password : "Invalid Password",
    invalid_login_detail : "Enter Valid Detail",
    invalid_role: "You are not eligible To perform this action",
    invalid_request_body : "Request Body Not containing all require field",
    unauthorized:"unauthorized User",
    unexsisted_user:"User not Exsist",
    expited_token : "Token expire",
    token_not_found : "Token Not Found",
    exsist_user : "User already registered.",
    new_user : "New User first need to register.",
    updated: "Updated successfully",
    block: "User Block successfully",
    valid_user:"valid User",
    logout:"successfully logout",
    internalServerError : "Internal Server Error",
    mongoNotConnect : "MongoDB Not Connected",
    dataNotFound : "Data Not available",
    mongoQueryError : "Due problem Query not perform",
    queryNotPerform : "Internal server error Query not performed"
};

exports.role = {
    King : "KING",
    Queen : "QUEEN",
    Male : "MALE",
    Female : "FEMALE",
    King_access : ['MALE','FEMALE','QUEEN','KING'],
    Queen_access : ['MALE','FEMALE','QUEEN'],
    Male_access : ['MALE'],
    Female_access : ['FEMALE']
};