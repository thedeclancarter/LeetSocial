// api.test.js

const supertest = require('supertest');
const { app, stopServer } = require('./server');


describe('Test API userSolvedCount',() => {
    it('Should return 200 with a valid Leetcode json output', async () => {
        const response = await supertest(app)
            .post('/api/userSolvedCount')
            .send({ username: 'EthanReleford'});

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ all: 4, easy: 4, medium: 0, hard: 0})
            
    });
    it('Should return 500 with an invalid Leetcode Username', async () => {
        const response = await supertest(app)
        .post('/api/query')
        .send({ username: 'EthanRelefrod' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to query the API' });
    });
});

describe('Test API Query',() => {
    it('Should return 200 with a valid Leetcode json output', async () => {
        const response = await supertest(app)
            .post('/api/query')
            .send({ username: 'EthanReleford'});

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ languageName: 'Java', problemsSolved: 4})
    });

    it('Should return 500 with an invalid Leetcode Username', async () => {
        const response = await supertest(app)
        .post('/api/query')
        .send({ username: 'EthanRelefrod' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to query the API' });
    });
});


describe('Test isValid API', () => {
  it('should return 200 with a valid Leetcode username', async () => {
    const response = await supertest(app)
      .post('/api/isValid')
      .send({ username: 'EthanReleford' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Valid Leetcode Username' });
  });

  it('should return 400 with an invalid Leetcode username', async () => {
    const response = await supertest(app)
      .post('/api/isValid')
      .send({ username: 'EthanRelefrod' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid Leetcode Username' });
  });
});


describe('Test searchUsers API', () => {
    it('should return 200 with a valid username search', async () => {
      const response = await supertest(app)
        .post('/api/searchUsers')
        .send({ searchString: 'Declan' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ firstName : 'Declan', lastName: 'Parker', leetCodeUsername: 'Ar4mis', userId: "655184bad077fc57debf74ae" }]);
    });

    it('should return 500 with an invalid username search', async () => {
      const response = await supertest(app)
        .post('/api/searchUsers')
        .send({ searchString: '' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "No Search String"});
    });
  });


  describe('Test login API', () => {
    it('should return 200 with a valid username search', async () => {
      const response = await supertest(app)
        .post('/api/login')
        .send({ email: 'testing@test.com', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
    });

    it('should return 401 with an invalid username search', async () => {
      const response = await supertest(app)
        .post('/api/login')
        .send({ email: 'notanemail', password: 'notapassword'});

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: "Invalid credentials"});
    });
  });

  
  //<==========================================================================================>//


  describe('Test addFriend API', () => {
    it('should return 200 with a valid friend id', async () => {
      const response = await supertest(app)
        .post('/api/addFriend')
        .send({
            userId: "6559724774ef28cdd41db85a",
            friendId: "655985103c8251cfb26bb38e"
          });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({"message": "Successfully Added Friend!"});
    });
  
    it('should return 500 with a duplicate friend id', async () => {
      const response = await supertest(app)
        .post('/api/addFriend')
        .send({
            userId: "6559724774ef28cdd41db85a",
            friendId: "655985103c8251cfb26bb38e"
          });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({"error": "Friend Already Added"});
    });
  });


//<==========================================================================================>//


  describe('Test removeFriend API', () => {
    it('should return 200 with a valid friend id', async () => {
      const response = await supertest(app)
        .post('/api/removeFriend')
        .send({
            userId: "6559724774ef28cdd41db85a",
            friendId: "655985103c8251cfb26bb38e"
          });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Successfully Removed Friend!" });
    });
  
    it('should return 500 with an invalid friend id', async () => {
      const response = await supertest(app)
        .post('/api/removeFriend')
        .send({
            userId: "6559724774ef28cdd41db85a",
            friendId: "655985103c8251cfb26bb38e"
          });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({error: "Friend Not Found"});
    });
  });

//<==========================================================================================>//

  describe('Test searchFriend API', () => {
    it('should return 200 with a valid friend id', async () => {
      const response = await supertest(app)
        .post('/api/searchFriends')
        .send({
            userId: "654ff2f4c63d62079896ea4b",
            searchString: "Declan"
          });

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{"firstName": "Declan", "lastName": "Parker", "leetCodeUsername": "Ar4mis", "userId": "655184bad077fc57debf74ae"}]);
    });
  
    it('should return 500  with an invalid friend id', async () => {
      const response = await supertest(app)
        .post('/api/searchFriends')
        .send({
            userId: "655184bad077fc57debf74af",
            searchString: "John"
          });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to Find User Info"});
    });
  });





//<==========================================================================================>//



/*
describe('Test viewProfile API', () => {
    it('should return 200 with a valid userid search', async () => {
      const response = await supertest(app)
        .post('/api/viewProfile')
        .send({
            userId: "655184bad077fc57debf74ae"
          });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        firstName: "Declan",
        lastName: "Parker",
        leetCodeUsername: "Ar4mis",
        following: [
          "654ff2f4c63d62079896ea4b"
        ],
        topLanguage: "C",
        topLanguageCount: 6,
        solvedCount: {
          all: 5,
          easy: 4,
          medium: 1,
          hard: 0
        }
      });
    });
    it('should return 500 with a valid userid search', async () => {
        const response = await supertest(app)
          .post('/api/viewProfile')
          .send({
              userId: "655184bad077fc57debf74as"
            });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({error: "Failed to Find LeetCode Info"});
      });
  });


*/
afterAll( async () => {
  stopServer();

});