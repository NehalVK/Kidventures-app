import { Book } from "lucide-react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";
import { useAge } from "../context/AgeContext";
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Stories = () => {
  const { ageGroup } = useAge();
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [userStory, setUserStory] = useState("");
  const [savedStories, setSavedStories] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  
  const storiesCategories = {
    "5-7": ["Bedtime Tales", "Animal Adventures", "Picture Stories"],
    "8-10": ["Mystery Club", "Space Explorers", "Funny Tales"],
    "11-15": ["Young Heroes", "Fantasy Worlds", "Life Stories"]
  };

  const currentCategories = storiesCategories[ageGroup] || [];
  
  const storiesContent = {
    "5-7": {
      "Bedtime Tales": [
        { 
          title: "The Sleepy Moon", 
          preview: "A gentle story about the moon getting ready for bed along with all the animals.",
          fullStory: "Once upon a time, in the peaceful night sky, the Moon was feeling very tired. 'It's time for bed,' yawned the Moon as she watched all the animals below getting ready to sleep. The little rabbits hopped into their burrows, the birds nestled in their nests, and the deer found cozy spots under the trees. The Moon smiled warmly, casting her gentle silver light over everyone. 'Good night, little creatures,' she whispered softly. As the Moon closed her eyes, all the animals felt safe and loved, drifting off to the most wonderful dreams. And so, every night, the Moon makes sure everyone has sweet dreams before she goes to sleep too."
        },
        { 
          title: "Good Night, Little Star", 
          preview: "A magical bedtime tale about a little star finding its place in the night sky.",
          fullStory: "Little Star was the youngest star in the sky, and she didn't know where she belonged. All the other stars seemed to have their special places, twinkling brightly in constellations. 'Where do I fit?' wondered Little Star sadly. The wise old Moon noticed her worry and said, 'Follow your heart, dear one.' Little Star began to shine her brightest, and suddenly she noticed a little girl on Earth looking up at the sky. The girl made a wish on Little Star! From that moment on, Little Star knew her purpose - to be the special wishing star for children everywhere. She found her perfect spot right next to the Moon, where she could hear every wish and help make dreams come true."
        },
        { 
          title: "Dreams of Candy Land", 
          preview: "Join Tommy on his dreamy adventure to the land of sweets and treats.",
          fullStory: "Tommy loved candy more than anything in the world. One night, as he fell asleep with visions of gummy bears dancing in his head, something magical happened. He found himself in Candy Land! The trees were made of cotton candy, the rivers flowed with chocolate, and the houses were built from gingerbread. Tommy met the Candy King, a jolly man made entirely of peppermint sticks. 'Welcome to Candy Land!' he boomed. 'But remember, the sweetest treats are the ones we share.' Tommy spent the night sharing candy with new friends - Gumdrop the dragon and Marshmallow the cloud. When he woke up, Tommy realized that sharing made everything taste even sweeter, and he couldn't wait to share his real candy with his friends at school."
        }
      ],
      "Animal Adventures": [
        { title: "Fluffy's Big Day", preview: "Join Fluffy the bunny on an exciting adventure in the forest.", fullStory: "Fluffy the bunny woke up one sunny morning with a twitch in his nose. 'Today is going to be a big day!' he thought. He hopped out of his burrow and into the forest, where he met a wise old owl. 'Hello, Fluffy,' hooted the owl. 'I have a challenge for you. Find the hidden carrot patch before sunset!' Fluffy's adventure began. He crossed babbling brooks, climbed over mossy logs, and even outsmarted a grumpy badger. Finally, just as the sun began to set, he found the carrot patch, filled with the juiciest carrots he had ever seen. 'I did it!' he cheered, munching happily on his reward." },
        { title: "The Lion Who Couldn't Roar", preview: "Help Leo the lion find his mighty roar again.", fullStory: "Leo the lion was the king of the jungle, but he had a problem - he couldn't roar! Every time he tried, only a tiny squeak came out. The other animals giggled, and Leo felt embarrassed. One day, he met a little mouse who said, 'Why don't you try singing instead?' Leo had never thought of that before. He closed his eyes and began to sing a beautiful melody. The other animals were amazed! They had never heard such a lovely sound. From that day on, Leo was known as the singing lion, and he was happier than ever." },
        { title: "Underwater Friends", preview: "Dive into the ocean with Sammy the seahorse and his colorful friends.", fullStory: "Sammy the seahorse lived in a vibrant coral reef, surrounded by colorful fish and playful dolphins. One day, he noticed a little clownfish looking sad. 'What's wrong?' asked Sammy. 'I've lost my way home,' cried the clownfish. Sammy offered to help. Together, they swam through the reef, asking every creature they met for directions. Finally, they found the clownfish's family, nestled safely in a sea anemone. 'Thank you, Sammy!' cried the clownfish. 'You're the best friend a fish could ask for!' Sammy smiled, knowing that helping others was the greatest adventure of all." }
      ],
      "Picture Stories": [
        { title: "My Colorful Day", preview: "A story with bright pictures about a day full of colors and joy.", fullStory: "Lily woke up to a world bursting with color. Her red blanket, the yellow sun peeking through the blue curtains - everything was a vibrant hue. She ate a green apple for breakfast and skipped outside to play. In the garden, she saw a rainbow of flowers, each one more beautiful than the last. She painted a picture with all the colors she could find, capturing the joy of her colorful day. As the sun set, painting the sky in shades of orange and pink, Lily knew that every day was a chance to see the world in a new and beautiful way." },
        { title: "Farm Friends", preview: "Meet the animals on Grandpa's farm through beautiful illustrations.", fullStory: "Grandpa's farm was a magical place, filled with friendly animals and endless adventures. There was Bessie the cow, with her gentle eyes and soft moo. There were the playful piglets, rolling in the mud and squealing with delight. And there was Henrietta the hen, clucking proudly as she laid her eggs. Every day was a new adventure on the farm, as Lily learned about the animals and helped Grandpa with his chores. She loved the smell of hay, the sound of the rooster crowing, and the feeling of being surrounded by her farm friends." },
        { title: "The Magical Garden", preview: "Discover the secrets of a garden where plants come to life at night.", fullStory: "At night, when the moon shone brightly, the garden came alive. The flowers whispered secrets to each other, the trees danced in the breeze, and the fireflies twinkled like stars. Lily would sneak out to the garden and listen to their stories. She learned about the magic of nature, the importance of friendship, and the power of dreams. The garden was her special place, where she could escape the world and discover the wonders that lay hidden in the darkness." }
      ]
    },
    "8-10": {
      "Mystery Club": [
        { title: "The Missing Library Book", preview: "Help the Mystery Club solve the case of the missing library book!", fullStory: "The Mystery Club, consisting of four friends - Alex, Ben, Chloe, and Daisy - gathered at their secret clubhouse. 'We have a new case!' announced Alex. 'A rare book has gone missing from the library.' The friends put on their detective hats and headed to the library. They interviewed the librarian, examined the bookshelves, and searched for clues. Finally, Chloe noticed a faint trail of glitter leading to a hidden room. Inside, they found the missing book, along with a note from a mischievous bookworm. The Mystery Club had solved another case!" },
        { title: "Secret of the Old Clock", preview: "Follow clues to discover what's hidden inside an old grandfather clock.", fullStory: "The old grandfather clock stood in the corner of the dusty attic, ticking away the seconds. One day, siblings Max and Mia discovered a hidden compartment behind the clock's face. Inside, they found a series of riddles. 'These must be clues!' exclaimed Mia. They followed the riddles, which led them on a treasure hunt throughout the house. Finally, the last riddle led them back to the clock, where they found a small wooden box. Inside the box was a collection of old family photos, revealing a secret history of their ancestors." },
        { title: "The Disappearing Cookies", preview: "Someone is taking cookies from the cookie jar. Can you help solve the mystery?", fullStory: "The aroma of freshly baked cookies filled the air, but something was amiss. The cookie jar, usually overflowing with treats, was mysteriously emptying. Lily and Tom decided to investigate. They set up a stakeout near the cookie jar, armed with notebooks and magnifying glasses. After hours of waiting, they caught the culprit - their pet dog, Buster, sneaking cookies from the jar! Buster wagged his tail guiltily, and the children couldn't help but laugh. They decided to hide the cookie jar on a higher shelf, out of Buster's reach." }
      ],
      "Space Explorers": [
        { title: "Mission to Mars", preview: "Join the junior astronauts on their exciting mission to the red planet.", fullStory: "The year is 2042, and a team of young astronauts is embarking on a mission to Mars. Led by Captain Eva, they set off in their spaceship, the 'Star Wanderer.' After months of travel, they finally reached the red planet. They explored the Martian landscape, collected rock samples, and even discovered signs of ancient life. Their mission was a success, and they returned to Earth as heroes, inspiring a new generation of space explorers." },
        { title: "Alien Friendship", preview: "What happens when a young space explorer meets a friendly alien?", fullStory: "While exploring a distant planet, young astronaut Leo stumbled upon a friendly alien named Zorp. Zorp was unlike anything Leo had ever seen, with bright green skin and three eyes. Despite their differences, they quickly became friends. Zorp showed Leo the wonders of his planet, including floating mountains and glowing forests. Leo taught Zorp about Earth, sharing stories and pictures of his home. They learned that friendship knows no boundaries, even across the vastness of space." },
        { title: "The Lost Moon Rock", preview: "Help find a special moon rock that has amazing powers.", fullStory: "During a lunar mission, a valuable moon rock went missing. The rock was said to have amazing powers, capable of healing and bringing good luck. A team of young detectives was called in to solve the mystery. They followed clues, interviewed astronauts, and searched the lunar base. Finally, they discovered that the rock had been accidentally taken by a robot, who had mistaken it for a snack. The moon rock was recovered, and its powers were used to help people all over the world." }
      ],
      "Funny Tales": [
        { title: "The Upside-Down Day", preview: "Everything is backwards in this hilarious story about a day gone wrong.", fullStory: "One morning, Lily woke up to find everything was upside down. The ceiling was the floor, the chairs were hanging from the roof, and even her breakfast was floating in the air. She tried to walk, but she kept bumping into things. She tried to eat, but the food kept falling on her head. It was the most ridiculous day of her life. Finally, as the sun set, everything flipped back to normal. Lily collapsed on her bed, exhausted but laughing. She had survived the upside-down day!" },
        { title: "Super Silly Superheroes", preview: "Meet superheroes with the most unusual and funny superpowers.", fullStory: "In a world filled with ordinary superheroes, there were also the Super Silly Superheroes. There was Captain Tickle, who could defeat villains with his unstoppable tickling. There was the Invisible Man, who kept bumping into things because he couldn't see himself. And there was the Super Sneezer, whose sneezes could blow away entire buildings. Despite their silly powers, they always managed to save the day, proving that even the most unusual heroes can make a difference." },
        { title: "The Teacher Who Turned into a Frog", preview: "What happens when a science experiment goes hilariously wrong?", fullStory: "Mr. Green was a science teacher who loved experiments. One day, he mixed a strange concoction in his lab, and something went terribly wrong. He suddenly transformed into a frog! The students were shocked, but they quickly adapted to their new situation. They learned about frogs, helped Mr. Green catch flies, and even built him a miniature pond in the classroom. Mr. Green eventually turned back into a human, but he never forgot his time as a frog, and he continued to teach his students about the wonders of science." }
      ]
    },
    "11-15": {
      "Young Heroes": [
        { title: "The Courage Test", preview: "A story about finding inner strength when facing life's challenges.", fullStory: "Maya was a shy teenager who always avoided challenges. One day, her school announced a public speaking competition. Maya was terrified, but her best friend encouraged her to participate. With trembling hands and a racing heart, Maya stepped onto the stage. She spoke about her fears, her dreams, and her determination to overcome her shyness. To her surprise, the audience cheered. Maya had passed the courage test, proving that even the shyest person can find their voice." },
        { title: "Friends Forever", preview: "When a new student arrives, the friendship circle is tested in unexpected ways.", fullStory: "When a new student named Jake arrived at school, the friendship circle of Sarah, Emily, and Tom was tested. Jake was cool, popular, and athletic, and Sarah and Emily were immediately drawn to him. Tom felt left out, as his friends spent less time with him. He confronted them, and they realized that they had been neglecting their friendship. They apologized to Tom, and they all welcomed Jake into their group, proving that true friendship can withstand any challenge." },
        { title: "Standing Up", preview: "A powerful story about standing up for what's right, even when it's difficult.", fullStory: "David witnessed a group of bullies harassing a younger student. He knew he had to do something, but he was afraid of becoming a target himself. He gathered his courage and confronted the bullies, telling them to stop. The bullies were surprised by his defiance and backed down. David had stood up for what was right, inspiring others to do the same. He learned that even one person can make a difference in the fight against injustice." }
      ],
      "Fantasy Worlds": [
        { title: "The Gateway", preview: "Discover a hidden portal to a magical world in your own backyard.", fullStory: "While exploring her backyard, Lily stumbled upon an ancient tree with a hidden portal. She stepped through the portal and found herself in a magical world filled with talking animals, enchanted forests, and sparkling rivers. She met a wise old wizard who told her that she was the chosen one, destined to save the world from an evil sorcerer. Lily embarked on a quest, gathering allies and battling monsters. Finally, she confronted the sorcerer and defeated him, restoring peace to the magical world." },
        { title: "Dragon Riders", preview: "An epic adventure about teenagers who form bonds with mysterious dragons.", fullStory: "In a land where dragons roamed the skies, teenagers were chosen to become dragon riders. They formed bonds with their dragons, learning to fly, fight, and protect their kingdom. Among them was a young girl named Elara, who formed a special connection with a rare silver dragon. Together, they faced challenges, battled enemies, and uncovered ancient secrets. They became legends, inspiring generations of dragon riders to come." },
        { title: "The Enchanted Forest", preview: "A quest through a forest where ancient magic and modern worlds collide.", fullStory: "A group of teenagers ventured into an enchanted forest, where ancient magic and modern worlds collided. They encountered mythical creatures, solved riddles, and faced their deepest fears. They learned about the power of nature, the importance of friendship, and the magic that lies within themselves. They emerged from the forest transformed, ready to face the challenges of the modern world with newfound wisdom and courage." }
      ],
      "Life Stories": [
        { title: "New School Blues", preview: "Navigating the challenges of starting at a new school and making friends.", fullStory: "Starting at a new school was tough for Alex. He felt lost, alone, and out of place. He struggled to make friends, and he missed his old school. But he didn't give up. He joined clubs, participated in activities, and reached out to his classmates. Slowly but surely, he began to make friends and feel like he belonged. He learned that starting over can be challenging, but it can also be an opportunity for growth and new beginnings." },
        { title: "Family Secrets", preview: "Uncovering long-kept family secrets that change everything you thought you knew.", fullStory: "Sarah discovered a hidden box in her attic, filled with old letters and photographs. She uncovered long-kept family secrets that changed everything she thought she knew about her ancestors. She learned about their struggles, their triumphs, and their hidden lives. She realized that families are complex, and that everyone has secrets. But she also learned that family bonds are strong, and that love can overcome any obstacle." },
        { title: "The Summer Project", preview: "A summer vacation turns into an unexpected journey of self-discovery.", fullStory: "During his summer vacation, Tom decided to volunteer at a local animal shelter. He spent his days caring for abandoned animals, cleaning cages, and helping with adoptions. He learned about responsibility, compassion, and the importance of giving back to the community. He also discovered a hidden talent for working with animals, and he realized that he wanted to pursue a career in veterinary medicine. His summer project had turned into an unexpected journey of self-discovery." }
      ]
    }
  };

  const handleSaveStory = () => {
    if (userStory.trim()) {
      const newStory = {
        id: Date.now(),
        content: userStory,
        date: new Date().toLocaleDateString()
      };
      setSavedStories([...savedStories, newStory]);
      setUserPoints(userPoints + 10);
      setUserStory("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Book className="text-kidpurple text-3xl" />
          <h1 className="text-4xl font-bold text-kidpurple">Storytelling</h1>
        </div>
        
        {/* User Points Display */}
        <div className="text-center mb-6">
          <div className="bg-kidyellow text-white px-4 py-2 rounded-full font-bold inline-block">
            Your Points: {userPoints}
          </div>
        </div>

        {/* Story Creation Section */}
        <Card className="mb-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-kidpurple">Create Your Own Story</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your amazing story here..."
              value={userStory}
              onChange={(e) => setUserStory(e.target.value)}
              className="min-h-32 mb-4"
            />
            <Button 
              onClick={handleSaveStory}
              className="bg-kidpurple hover:bg-purple-600"
              disabled={!userStory.trim()}
            >
              Save Story (+10 points)
            </Button>
          </CardContent>
        </Card>

        {/* Saved Stories */}
        {savedStories.length > 0 && (
          <Card className="mb-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-kidpurple">Your Saved Stories</CardTitle>
            </CardHeader>
            <CardContent>
              {savedStories.map((story) => (
                <div key={story.id} className="border-b pb-4 mb-4 last:border-b-0">
                  <p className="text-sm text-gray-500 mb-2">Saved on: {story.date}</p>
                  <p className="text-gray-700">{story.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveSubcategory}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all" className="flex gap-2 items-center">
                <Book className="h-4 w-4" /> All
              </TabsTrigger>
              {currentCategories.map((category) => (
                <TabsTrigger key={category} value={category} className="flex gap-2 items-center">
                  <Book className="h-4 w-4" /> {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all">
              {currentCategories.map((category) => (
                <div key={category} className="mb-8">
                  <h2 className="text-2xl font-semibold text-kidpurple mb-4">{category}</h2>
                  {storiesContent[ageGroup][category].map((item, index) => (
                    <StoryCard
                      key={index}
                      title={item.title}
                      preview={item.preview}
                      fullStory={item.fullStory}
                    />
                  ))}
                </div>
              ))}
            </TabsContent>

            {currentCategories.map((category) => (
              <TabsContent key={category} value={category}>
                <h2 className="text-2xl font-semibold text-kidpurple mb-4">{category}</h2>
                {storiesContent[ageGroup][category].map((item, index) => (
                  <StoryCard
                    key={index}
                    title={item.title}
                    preview={item.preview}
                    fullStory={item.fullStory}
                  />
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

const StoryCard = ({ title, preview, fullStory }) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="content-card w-full max-w-md mx-auto my-4">
      <div className="bg-gradient-to-br from-kidpurple to-purple-400 p-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="bg-white p-6">
        <div className="mb-4">
          {showFull ? fullStory : preview}
        </div>
        <Button
          onClick={() => setShowFull(!showFull)}
          variant="outline"
          size="sm"
          className="border-kidpurple text-kidpurple hover:bg-kidpurple hover:text-white"
        >
          {showFull ? "Show Less" : "Read More"}
        </Button>
      </div>
    </div>
  );
};

export default Stories;
