import BlogPost from "@/components/BlogPost";

const title = "thoughts on online versus in-person";
export const metadata = { title: `${title} · William Sun` };

export default function OnlineVsInPersonPage() {
  return (
    <BlogPost title={title} sections={[]} intro={<>
      <p>while online poker is great because you can play from the comfort of your room and hands move much faster,
        i&apos;ve discovered through personal experience that there is a severe problem with gameplay integrity. it&apos;s almost trivial to cheat online in ways that
        are practically undetectable. there&apos;s a whole spectrum of cheating, from softplaying against friends, to colluding with other players, to running a solver in real time.</p>
      <p>i&apos;ve witnessed cheating firsthand on both commercial platforms like ClubWPT Gold and in private online games.
        i once saw someone check ak down all the way from preflop through the river in position despite flopping top pair, turning trips, and getting a clean river. their opponent?
        an account with only ~500 hands played. for context, most players at those stakes were regs with tens of thousands of hands played. i&apos;ve also dealt with people openly admitting to softplaying
        against their friends in private online games, knowing they will not face any consequences or real repercussions because it&apos;s a random online circle, and nobody knows them in real life.
        i&apos;ve even seen players scam others out of thousands of dollars by simply refusing to pay out losses, espceially in heads-up online matches.</p>
      <p>in-person poker isn&apos;t perfect either. at Encore Boston Harbor, one of the larger poker rooms, a big portion of the 5/10 player pool
        consists of the same recurring regulars. i see the same group nearly every session. i&apos;ve also learned that some of these players coach each other away from the casino in their downtime.
        while i don&apos;t have hard evidence of collusion, it would be very easy for people to set up communication systems that let them collude in real time through coordinated bet sizing or physical tells.
        and since Encore is one of the larger casinos, these issues are almost certainly worse in smaller player pools.
      </p>
    </>} />
  );
}
