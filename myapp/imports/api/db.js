import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const db = new Mongo.Collection('diagram');

if(Meteor.isServer) {
	
}

Meteor.methods({
	/*
	 * @name: db.savegraph
	 * @input: graph state, name of graph
	 * @output: saves the graph and its name to a user
	 */

	'db.savegraph'(graph, graphName){
		check(graph.graph, String);
		check(graphName, String);

		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
			// not sure if we want to throw an error...
		}

		if(db.update({$and:[{graphName: graphName}, {owner: this.userId}]}, { $set: {graph: graph.graph}}) === 0) {
			// if it wasn't able to find one
			db.insert({
				graphName: graphName,
				graph: graph.graph,
				createdAt: new Date(),
				// name: name,
				owner: this.userId,
				username: Meteor.users.findOne(this.userId).username,
			});
		}
	
		console.log('end');
	},
})