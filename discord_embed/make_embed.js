import { EmbedBuilder } from 'discord.js';
import * as fs from 'fs';
import 'dotenv/config';

// read input
const content = `${process.env.CONTENT || ''}`.trim();
let changelog = `${process.env.CHANGELOG}`.split("**Full Changelog**")[0].trim();
const released = process.env.RELEASED == "true";
const title = `${process.env.TITLE}`.trim();
const description = `${process.env.DESCRIPTION}`.trim();
const color = Number.parseInt(process.env.COLOR);
const version = `${process.env.VERSION}`.trim();
const curseforge = `${process.env.CURSEFORGE}`.trim();
const modrinth = `${process.env.MODRINTH}`.trim();
const github = `${process.env.GITHUB}`.trim();
const thumbnail = `${process.env.THUMBNAIL}`.trim();

// prepare variables
let pages = `<:github:938091396785639434> [GitHub](${github})`;
if (released) {
    pages += `\n<:curseforge:938093919848267807> [Curseforge](${curseforge})`;
    pages += `\n<:modrinth:977251171980963890> [Modrinth](${modrinth})`;
}
changelog = "```md\n" + changelog + "\n```";

// prepare embed
const embed = new EmbedBuilder();
embed.setColor(color);
embed.setThumbnail(thumbnail);
embed.setTimestamp(Date.now());
embed.setTitle(title);
embed.setDescription(description);
embed.addFields(
    { name: "Changelog", value: changelog, inline: false },
    { name: "Project Pages", value: pages, inline: true },
    { name: "New Version", value: version, inline: true }
);

// setup message content
const json = {
    username: "TK's Mod Releases",
    avatar_url: "https://cdn.modrinth.com/data/UKDLi1GJ/d345468b19bfd5ffffa1ed070297a6a74535e9d6.png",
    embeds: [embed]
}
if (content.length > 0) {
    json['content'] = content;
}

// write json to file
const jsonString = JSON.stringify(json, null, '\t');
fs.writeFileSync("embed.json", jsonString);
